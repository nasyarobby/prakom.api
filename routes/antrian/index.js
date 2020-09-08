const models = require("./../../models");
const checkToken = require("../checkToken");
var moment = require("moment"); // require
require("moment/locale/id");
moment.locale("id");
const jwt = require("jsonwebtoken");

module.exports = (server) => {
  server.get("/api/antrian", checkToken, async (req, res, next) => {
    const { token, id, kpp, kode } = req.query;
    console.log(id, kpp, kode);
    if (token !== undefined) {
      const data = jwt.decode(token);
      if (data) {
        const { id, kpp, kode } = data;
        const exist = await getAntrianByKeys(id, kpp, kode);
        res.jsend.success(exist);
      } else {
        res.jsend.error("token is invalid.");
      }
    } else if (id && kpp && kode) {
      const exist = await getAntrianByKeys(id, kpp, kode);
      res.jsend.success(exist);
    } else {
      res.jsend.fail("Token or some keys are not found.");
    }
  });

  async function getAntrianByKeys(id, kodeKpp, kode) {
    const { antrian } = models;
    const exist = await antrian.findOne({
      where: { id, kodeKpp, kode },
      include: [models.layanan, models.kpp],
    });
    if (exist) return { ...exist.dataValues, qr: createQr(exist.dataValues) };
    else return exist;
  }

  server.get("/api/antrian/slot", async (req, res, next) => {
    const { antrian, Sequelize, sequelize } = models;
    const { kpp, tanggal } = req.query;
    const slot = await antrian.findAll({
      attributes: [
        "jadwalMulai",
        "jadwalSelesai",
        [sequelize.fn("COUNT", sequelize.col("jadwal_mulai")), "jumlah"],
      ],
      where: {
        [Sequelize.Op.and]: [
          { kodeKpp: kpp },
          sequelize.where(
            sequelize.fn("DATE", sequelize.col("antrian.jadwal_mulai")),
            {
              [Sequelize.Op.eq]: tanggal,
            }
          ),
        ],
      },
      group: ["jadwalMulai", "jadwalSelesai"],
    });
    res.jsend.success({ tanggal: moment(tanggal).format("YYYY-MM-DD"), slot });
  });

  server.get("/api/antrian/upcoming", checkToken, async (req, res, next) => {
    const { npwp } = req.user;
    const { antrian, Sequelize, sequelize } = models;
    const upcoming = await antrian.findAll({
      where: {
        [Sequelize.Op.and]: [
          { npwp: npwp },
          sequelize.where(
            sequelize.fn("DATE", sequelize.col("antrian.jadwal_mulai")),
            {
              [Sequelize.Op.gte]: sequelize.fn("CURDATE"),
            }
          ),
        ],
      },
      order: [["jadwalMulai", "DESC"]],
      include: [models.layanan, models.kpp],
    });
    res.jsend.success(
      upcoming.map((janji) => {
        return { ...janji.dataValues, qr: createQr(janji.dataValues) };
      })
    );
  });

  server.get("/api/antrian/past", checkToken, async (req, res, next) => {
    const { npwp } = req.user;
    const { antrian, Sequelize, sequelize } = models;
    const past = await antrian.findAll({
      where: {
        [Sequelize.Op.and]: [
          { npwp: npwp },
          sequelize.where(
            sequelize.fn("DATE", sequelize.col("antrian.jadwal_mulai")),
            {
              [Sequelize.Op.lt]: sequelize.fn("CURDATE"),
            }
          ),
        ],
      },
      order: [["jadwalMulai", "DESC"]],
      include: [models.layanan, models.kpp],
    });
    res.jsend.success(
      past.map((janji) => {
        return { ...janji.dataValues, qr: createQr(janji.dataValues) };
      })
    );
  });

  server.post(
    "/api/antrian",
    checkToken,
    checkParams,
    async (req, res, next) => {
      const kode = getRndInteger(100000, 999999);

      const {
        nik,
        nama,
        telepon,
        email,
        kodeKpp,
        jadwalMulai,
        jadwalSelesai,
        layananId,
        detilLayanan,
      } = req.body;
      const data = {
        npwp: req.user.npwp,
        namaWp: req.user.nama,
        nik,
        nama,
        telepon,
        email,
        kodeKpp,
        jadwalMulai: moment({
          ...jadwalMulai,
          hours: jadwalMulai.hours - 7,
        }).toISOString(),
        jadwalSelesai: moment({
          ...jadwalSelesai,
          hours: jadwalSelesai.hours - 7,
        }).toISOString(),
        layananId,
        detilLayanan,
        kode,
      };
      const insert = await models.antrian.create(data);
      res.jsend.success({
        ...insert,
        qr: createQr(insert),
      });
    }
  );

  server.post("/api/antrian/update", checkToken, async (req, res, next) => {
    const { id, kode, data } = req.body;
    const obj = await models.antrian.findOne({ where: { id, kode } });
    if (obj) {
      Object.assign(obj, data);
      await obj.save();
      res.jsend.success({
        ...obj.dataValues,
        qr: createQr(obj.dataValues),
      });
    } else {
      res.jsend.fail("Not found.");
    }
  });

  server.get("/api/antrian-kpp", checkToken, async (req, res, next) => {
    const { user } = req;
    const { antrian, Sequelize, sequelize } = models;

    const rows = await antrian.findAll({
      where: {
        [Sequelize.Op.and]: [
          { kodeKpp: user.kppKode },
          { realMulai: { [Sequelize.Op.eq]: null } },
          { realSelesai: { [Sequelize.Op.eq]: null } },
          sequelize.where(
            sequelize.fn("DATE", sequelize.col("antrian.waktu_kedatangan")),
            {
              [Sequelize.Op.eq]: sequelize.fn("CURDATE"),
            }
          ),
          sequelize.where(sequelize.col("loket.nomor_antrian"), {
            [Sequelize.Op.eq]: null,
          }),
        ],
      },
      include: [
        models.layanan,
        models.kpp,
        {
          model: models.loket,
        },
      ],
    });

    res.jsend.success({ antrian: rows });
  });
};

function createQr(data) {
  return jwt.sign(
    {
      id: data.id,
      npwp: data.npwp,
      kpp: data.kodeKpp,
      kode: data.kode,
    },
    "prakom2020"
  );
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function checkParams(req, res, next) {
  if (req.body) {
    const errors = {};
    let error = false;
    [
      "nik",
      "nama",
      "telepon",
      "email",
      "kodeKpp",
      "jadwalMulai",
      "jadwalSelesai",
      "layananId",
      "detilLayanan",
    ].forEach((param) => {
      if (!req.body[param]) {
        errors[param] = `${param} is missing.`;
        error = true;
      }
    });
    if (error) {
      res.jsend.fail(errors);
    } else {
      next();
    }
  } else {
    res.jsend.fail("Request body is missing.`");
  }
  next();
}

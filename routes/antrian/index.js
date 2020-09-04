const models = require("./../../models");
const checkToken = require("../checkToken");
var moment = require("moment"); // require
require("moment/locale/id");
moment.locale("id");
moment().format();
const jwt = require("jsonwebtoken");
const { sequelize } = require("./../../models");

module.exports = (server) => {
  server.get("/antrian", checkToken, async (req, res, next) => {
    const { token } = req.query;
    if (token !== undefined) {
      const data = jwt.decode(token);
      if (data) {
        const { npwp, id, kpp: kodeKpp, kode } = data;
        const { antrian, sequelize, Sequelize } = models;
        const exist = await antrian.findOne({
          where: { id, npwp, kodeKpp, kode },
          include: [models.layanan, models.kpp],
        });
        if (exist) res.jsend.success(exist);
      } else {
        res.jsend.error("token is invalid.");
      }
    } else {
    }
  });

  server.get("/antrian/upcoming", checkToken, async (req, res, next) => {
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

  server.get("/antrian/past", checkToken, async (req, res, next) => {
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

  server.post("/antrian", checkToken, checkParams, async (req, res, next) => {
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
      jadwalMulai: moment(jadwalMulai).toDate(),
      jadwalSelesai: moment(jadwalSelesai).toDate(),
      layananId,
      detilLayanan,
      kode,
    };
    const insert = await models.antrian.create(data);
    res.jsend.success({
      ...insert,
      qr: createQr(insert),
    });
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

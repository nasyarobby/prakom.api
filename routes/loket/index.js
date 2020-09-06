const models = require("./../../models");
const checkToken = require("./../checkToken");

var moment = require("moment"); // require
require("moment/locale/id");
moment.locale("id");

module.exports = (server) => {
  server.get("/api/loket/:kpp", async (req, res, next) => {
    const { kpp } = req.params;
    const { loket } = models;

    const exist = await loket.findAll({
      where: { kodeKpp: kpp },
      include: ["kpp", "pegawai", "antrian"],
    });
    res.jsend.success({ loket: exist });
  });

  server.get("/api/loket/:kpp/:nomor", async (req, res, next) => {
    const { kpp, nomor } = req.params;
    const { loket } = models;

    const exist = await loket.findOne({
      where: { kodeKpp: kpp, nomor },
      include: [
        "kpp",
        "pegawai",
        { model: models.antrian, include: ["layanan", "kpp"] },
      ],
    });
    res.jsend.success({ loket: exist });
  });

  server.post(
    "/api/loket/:kpp/:nomor/tempati",
    checkToken,
    async (req, res, next) => {
      const { user } = req;
      const { kpp, nomor } = req.params;
      const { loket } = models;

      const exist = await loket.findOne({
        where: { kodeKpp: kpp, nomor, nip: null },
        include: ["kpp", "pegawai", "antrian"],
      });
      exist.nip = user.nipPendek;
      await exist.save();
      res.jsend.success({ loket: exist });
    }
  );

  server.post(
    "/api/loket/:kpp/:nomorLoket/pilih-antrian",
    checkToken,
    async (req, res, next) => {
      const { nomorAntrian } = req.body;
      const { user } = req;
      const { kpp, nomorLoket } = req.params;
      const { loket, Sequelize } = models;

      const exist = await loket.findOne({
        where: {
          kodeKpp: kpp,
          nomor: nomorLoket,
          nomorAntrian: {
            [Sequelize.Op.eq]: null,
          },
        },
        include: ["kpp", "pegawai", "antrian"],
      });
      if (exist) {
        exist.nomorAntrian = nomorAntrian;
        await exist.save();
        res.jsend.success({ loket: exist });
      } else {
        res.jsend.fail("Not found.");
      }
    }
  );

  server.post(
    "/api/loket/:kpp/:nomor/kembalikan-wp",
    checkToken,
    async (req, res, next) => {
      const { user } = req;
      const { kpp, nomor } = req.params;
      const { loket, Sequelize } = models;

      const exist = await loket.findOne({
        where: {
          kodeKpp: kpp,
          nomor,
          nomorAntrian: {
            [Sequelize.Op.ne]: null,
          },
        },
        include: ["kpp", "pegawai", "antrian"],
      });
      exist.nomorAntrian = null;
      await exist.antrian.update({
        petugasNipPendek: null,
        realMulai: null,
        realSelesai: null,
      });
      await exist.save();
      res.jsend.success({ loket: exist });
    }
  );

  server.post(
    "/api/loket/:kpp/:nomor/mulai",
    checkToken,
    async (req, res, next) => {
      const { user } = req;
      const { kpp, nomor } = req.params;
      const { loket, Sequelize } = models;

      const exist = await loket.findOne({
        where: {
          kodeKpp: kpp,
          nomor,
          nomorAntrian: {
            [Sequelize.Op.ne]: null,
          },
        },
        include: ["kpp", "pegawai", "antrian"],
      });
      await exist.antrian.update({
        petugasNipPendek: user.nipPendek,
        realMulai: moment().toISOString(),
      });
      await exist.save();
      res.jsend.success({ loket: exist });
    }
  );

  server.post(
    "/api/loket/:kpp/:nomor/selesai",
    checkToken,
    async (req, res, next) => {
      const { user } = req;
      const { kpp, nomor } = req.params;
      const { loket, Sequelize } = models;

      const exist = await loket.findOne({
        where: {
          kodeKpp: kpp,
          nomor,
          nomorAntrian: {
            [Sequelize.Op.ne]: null,
          },
        },
        include: ["kpp", "pegawai", "antrian"],
      });
      await exist.antrian.update({
        realSelesai: moment().toISOString(),
      });
      await exist.save();
      res.jsend.success({ loket: exist });
    }
  );

  server.post(
    "/api/loket/:kpp/:nomor/selesai2",
    checkToken,
    async (req, res, next) => {
      const { user } = req;
      const { kpp, nomor } = req.params;
      const { loket, Sequelize } = models;

      const exist = await loket.findOne({
        where: {
          kodeKpp: kpp,
          nomor,
          nomorAntrian: {
            [Sequelize.Op.ne]: null,
          },
        },
        include: ["kpp", "pegawai", "antrian"],
      });
      exist.nomorAntrian = null;
      await exist.save();
      res.jsend.success({ loket: exist });
    }
  );
};

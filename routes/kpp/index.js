const models = require("./../../models");

module.exports = (server) => {
  server.get("/kpp/:kode", async (req, res, next) => {
    const kode = req.params.kode;
    const { kpp, sequelize, Sequelize } = models;
    const predicates = [{ kode }];

    const exist = await kpp.findOne({
      where: {
        [Sequelize.Op.and]: predicates,
      },
    });
    res.jsend.success({ kpp: exist });
  });
};

const models = require("./../../models");

module.exports = (server) => {
  server.get("/api/layanan", async (req, res, next) => {
    const { layanan } = models;

    const exist = await layanan.findAll();
    res.jsend.success({ layanan: exist });
  });
};

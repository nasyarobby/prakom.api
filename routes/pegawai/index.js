const models = require("./../../models");
const jwt = require("jsonwebtoken");

module.exports = (server) => {
  server.post("/api/pegawai/login", async (req, res, next) => {
    const nip = req.body && req.body.nip;
    const password = req.body && req.body.password;

    if (nip && password) {
      const user = await models.pegawai.findOne({
        where: { nipPendek: nip, password },
      });
      if (user) {
        const payload = { ...user.dataValues };
        delete payload.password;
        const token = jwt.sign(payload, "prakom2020");
        return res.jsend.success({ token });
      } else {
        return res.jsend.fail({ login: "Login gagal." });
      }
    } else {
      return res.jsend.fail({
        npwp: nip ? undefined : "wajib diisi",
        password: password ? undefined : "wajib diisi",
      });
    }
  });
};

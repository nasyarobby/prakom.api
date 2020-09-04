const models = require("./../../models");
const checkToken = require("./../checkToken");

module.exports = (server) => {
  server.get("/api/assessment/:nik", checkToken, async (req, res, next) => {
    const nik = req.params.nik;
    const date = req.query.date;
    const { assessment, sequelize, Sequelize } = models;
    const predicates = [{ nik: nik }];

    date &&
      predicates.push(
        sequelize.where(sequelize.fn("DATE", sequelize.col("created_at")), date)
      );

    const exist = await assessment.findAll({
      where: {
        [Sequelize.Op.and]: predicates,
      },
    });
    res.jsend.success({ assessment: exist });
  });

  server.post(
    "/api/assessment",
    checkToken,
    assessmentCheckParams,
    async (req, res, next) => {
      const { assessment, sequelize, Sequelize } = models;
      const { nik, data, hasil } = req.body;
      const exist = await assessment.findOne({
        where: {
          [Sequelize.Op.and]: [
            sequelize.where(
              sequelize.fn("DATE", sequelize.col("created_at")),
              sequelize.fn("CURDATE")
            ),
            { nik: nik },
          ],
        },
      });
      console.log(exist);
      if (exist) {
        res.jsend.error({ message: "Assessment sudah diisi." });
      } else {
        const saved = await assessment.create({
          nik,
          data: typeof data === "string" ? data : JSON.stringify(data),
          hasil,
        });
        res.jsend.success({ token: req.body.token, ...saved.dataValues });
        next(false);
      }
    }
  );
};

function assessmentCheckParams(req, res, next) {
  const nik = req.body && req.body.nik;
  const data = req.body && req.body.data;
  const hasil = req.body && req.body.hasil;
  let error = false;
  const errorMsg = {};
  if (!nik) {
    errorMsg.nik = "nik is missing";
    error = true;
  }
  if (!data) {
    errorMsg.data = "data is missing";
    error = true;
  }
  if (!hasil) {
    errorMsg.hasil = "hasil is missing";
    error = true;
  }

  if (error) {
    res.jsend.fail(errorMsg);
  } else {
    next();
  }
}

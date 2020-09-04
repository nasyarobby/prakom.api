const assessmentRoute = require("./assessment");
const kppRoute = require("./kpp");
const antrianRoute = require("./antrian");
const layanan = require("./layanan");
module.exports = (server) => {
  assessmentRoute(server);
  kppRoute(server);
  antrianRoute(server);
  layanan(server);
};

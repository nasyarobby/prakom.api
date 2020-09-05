const assessmentRoute = require("./assessment");
const kppRoute = require("./kpp");
const antrianRoute = require("./antrian");
const layanan = require("./layanan");
const pegawai = require("./pegawai");
module.exports = (server) => {
  assessmentRoute(server);
  kppRoute(server);
  antrianRoute(server);
  layanan(server);
  pegawai(server);
};

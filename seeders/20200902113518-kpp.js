"use strict";
const data = require("./kpp.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "kpp",
      data.map((kpp) => ({
        kode: kpp.RF_KD_KPP,
        nama: kpp.RF_NM_KPP,
        alamat: kpp.RF_ALM_KPP_JLN + " No." + kpp.RF_ALM_KPP_NO,
        kota: kpp.RF_KOTA_KPP,
        telepon: kpp.RF_NO_TELP_KPP,
      })),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

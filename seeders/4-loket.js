"use strict";

const moment = require("moment");

const wajibpajak = [
  {
    kode_kpp: "028",
    nomor: 1,
  },
  {
    kode_kpp: "028",
    nomor: 3,
  },
  {
    kode_kpp: "028",
    nomor: 4,
  },
  {
    kode_kpp: "028",
    nomor: 5,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("loket", wajibpajak);
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

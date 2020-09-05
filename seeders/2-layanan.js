"use strict";

const data = [
  "Layanan konsultasi perpajakan",
  "Layanan konsultasi aplikasi",
  "Layanan Tempat Pelayanan Terpadu",
  "Buat janji temu pegawai",
  "Layanan lainnya",
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "layanan",
      data.map((nama) => ({
        nama,
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

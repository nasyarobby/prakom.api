"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("loket", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
      kode_kpp: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      nomor: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
      nip: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      nomor_antrian: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
      status: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("loket");
  },
};

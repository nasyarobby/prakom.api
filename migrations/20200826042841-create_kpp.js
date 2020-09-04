"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("kpp", {
      kode: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      alamat: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT,
        defaultValue: "",
      },
      kota: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: "",
      },
      telepon: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
        defaultValue: "",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("kpp");
  },
};

"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("assessment", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
      nik: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      data: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT,
      },
      hasil: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("assessment");
  },
};

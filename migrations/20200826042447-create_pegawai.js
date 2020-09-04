"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("pegawai", {
      nip_pendek: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.STRING,
      },
      nip_panjang: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.STRING,
      },
      jabatan: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
      },
      role: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      kpp_kode: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("pegawai");
  },
};

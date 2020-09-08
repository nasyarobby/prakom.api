"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("antrian", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
      npwp: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      nama_wp: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      nik: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      telepon: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      kode_kpp: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      waktu_kedatangan: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      jadwal_mulai: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      jadwal_selesai: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      real_mulai: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      real_selesai: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      petugas_nip_pendek: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      layanan_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
      detil_layanan: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT,
      },
      kode: { allowNull: false, type: Sequelize.DataTypes.STRING(10) },
      evaluasi: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("antrian");
  },
};

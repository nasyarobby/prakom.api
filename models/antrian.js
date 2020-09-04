"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class assessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { layanan, antrian, kpp } = models;
      antrian.layanan = antrian.belongsTo(layanan, {
        foreignKey: "layananId",
      });

      antrian.kpp = antrian.belongsTo(kpp, {
        foreignKey: "kodeKpp",
      });
    }
  }
  assessment.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      npwp: DataTypes.STRING,
      namaWp: {
        field: "nama_wp",
        type: DataTypes.STRING,
      },
      nama: DataTypes.STRING,
      nik: DataTypes.STRING,
      telepon: DataTypes.STRING,
      email: DataTypes.STRING,
      kodeKpp: {
        field: "kode_kpp",
        type: DataTypes.STRING,
      },
      waktuKedatangan: {
        field: "waktu_kedatangan",
        type: DataTypes.DATE,
      },
      jadwalMulai: {
        field: "jadwal_mulai",
        type: DataTypes.DATE,
      },
      jadwalSelesai: {
        field: "jadwal_selesai",
        type: DataTypes.DATE,
      },
      realMulai: {
        field: "real_mulai",
        type: DataTypes.DATE,
      },
      realSelesai: {
        field: "real_selesai",
        type: DataTypes.DATE,
      },
      petugasNipPendek: {
        field: "petugas_nip_pendek",
        type: DataTypes.STRING,
      },
      layananId: {
        field: "layanan_id",
        type: DataTypes.INTEGER.UNSIGNED,
      },
      detilLayanan: {
        field: "detil_layanan",
        type: DataTypes.TEXT,
      },
      kode: DataTypes.STRING,
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "antrian",
      tableName: "antrian",
    }
  );
  return assessment;
};

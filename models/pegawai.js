"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  pegawai.init(
    {
      nipPendek: {
        field: "nip_pendek",
        type: DataTypes.STRING,
        primaryKey: true,
      },
      nipPanjang: {
        field: "nip_panjang",
        type: DataTypes.STRING,
      },
      nama: {
        type: DataTypes.STRING,
      },
      jabatan: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      role: {
        type: DataTypes.STRING,
      },
      kppKode: {
        field: "kpp_kode",
        type: DataTypes.STRING,
      },
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
      modelName: "pegawai",
      tableName: "pegawai",
    }
  );
  return pegawai;
};

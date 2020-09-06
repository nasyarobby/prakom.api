"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class loket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { antrian, pegawai, kpp, loket } = models;
      loket.antrian = loket.belongsTo(antrian, {
        foreignKey: "nomor_antrian",
      });

      loket.kpp = loket.belongsTo(kpp, {
        foreignKey: "kodeKpp",
      });

      loket.pegawai = loket.belongsTo(pegawai, {
        foreignKey: "nip",
      });
    }
  }
  loket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      kodeKpp: {
        field: "kode_kpp",
        type: DataTypes.STRING,
      },
      nomor: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      nip: {
        type: DataTypes.STRING,
      },
      nomorAntrian: {
        field: "nomor_antrian",
        type: DataTypes.INTEGER.UNSIGNED,
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "loket",
      tableName: "loket",
      timestamps: false,
    }
  );
  return loket;
};

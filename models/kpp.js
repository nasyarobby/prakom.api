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
      // define association here
    }
  }
  assessment.init(
    {
      kode: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      nama: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      kota: DataTypes.STRING,
      telepon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "kpp",
      tableName: "kpp",
      timestamps: false,
    }
  );
  return assessment;
};

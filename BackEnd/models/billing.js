'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Billing extends Model {
    static associate(models) {
      // Define association with User
      Billing.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Billing.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // table name should match your User table
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    paymentMethod: DataTypes.STRING,
    totalCost: DataTypes.FLOAT,
    tourTitle: DataTypes.STRING,
    tourPlace: DataTypes.STRING,
    arrivalDate: DataTypes.DATE,
    departureDate: DataTypes.DATE,
    children: DataTypes.INTEGER,
    adults: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Billing',
  });

  return Billing;
};

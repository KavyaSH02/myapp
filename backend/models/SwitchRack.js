const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SwitchRack = sequelize.define('SwitchRack', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  details: { type: DataTypes.STRING, allowNull: false },
  unit: { type: DataTypes.STRING, allowNull: false },
  received: { type: DataTypes.INTEGER, allowNull: false },
  issued: { type: DataTypes.INTEGER, allowNull: false },
  balance: { type: DataTypes.INTEGER, allowNull: false },
  sign: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = SwitchRack;
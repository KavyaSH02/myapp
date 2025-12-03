const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Attendance = sequelize.define('Attendance', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  inTime: { type: DataTypes.TIME, allowNull: false },
  outTime: { type: DataTypes.TIME, allowNull: false },
  leaveType: { type: DataTypes.STRING, allowNull: false },
  signature: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Attendance;
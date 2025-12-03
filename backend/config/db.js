const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myapp', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('Error connecting:', err));

module.exports = sequelize;

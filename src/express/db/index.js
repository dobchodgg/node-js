const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'postgres',
  omitNull: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

const db = {
  sequelize: sequelize,
  Warehouse: require('../models/warehouse')(sequelize),
  Product: require('../models/product')(sequelize),
  ProductQuantity: require('../models/product-quantity')(sequelize),
  User: require('../models/user')(sequelize)
};

db.Product.hasMany(db.ProductQuantity, { as: 'quantities', sourceKey: 'id' });
db.Warehouse.hasMany(db.ProductQuantity, { as: 'storage', sourceKey: 'id' });

module.exports = { db };

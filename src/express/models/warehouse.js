const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * @typedef Warehouse
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} created
 * @property {string} updated
 * @property {string} deleted
 * @property {import('./product-quantity').ProductQuantity[]} [storage]
 * @typedef {Omit<Warehouse, 'id' | 'created' | 'updated' | 'deleted'>} CreateWarehouse
 * @typedef {import('sequelize').ModelStatic<Model<Warehouse, CreateWarehouse>>} WarehouseModel
 */

/**
 * @param {Sequelize} sequelize
 * @returns {WarehouseModel}
 */
module.exports = (sequelize) => {
  const Warehouse = sequelize.define(
    'Warehouse',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'Warehouse',
      createdAt: 'created',
      updatedAt: 'updated',
      deletedAt: 'deleted',
      paranoid: true,
      freezeTableName: true,
      timestamps: true
    }
  );

  return Warehouse;
};

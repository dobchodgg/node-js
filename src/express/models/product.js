import { DataTypes } from 'sequelize';

/**
 * @typedef Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} sku
 * @property {string} created
 * @property {string} updated
 * @property {string} deleted
 * @property {import('./product-quantity').ProductQuantity[]} [quantities]
 * @typedef {Omit<Product, 'id' | 'created' | 'updated' | 'deleted'>} CreateProduct
 * @typedef {import('sequelize').ModelStatic<import('sequelize').Model<Product, CreateProduct>>} ProductModel
 */

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @returns {ProductModel}
 */
export default (sequelize) => {
  const Product = sequelize.define(
    'Product',
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
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'Product',
      createdAt: 'created',
      updatedAt: 'updated',
      deletedAt: 'deleted',
      paranoid: true,
      freezeTableName: true,
      timestamps: true
    }
  );

  return Product;
};

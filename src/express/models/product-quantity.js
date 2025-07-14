import { DataTypes } from 'sequelize';

/**
 * @typedef ProductQuantity
 * @property {string} id
 * @property {string} productId
 * @property {string} warehouseId
 * @property {number} quantity
 * @property {string} created
 * @property {string} updated
 * @property {string} deleted
 * @typedef {Omit<ProductQuantity, 'id' | 'created' | 'updated' | 'deleted'>} CreateProductQuantity
 * @typedef {import('sequelize').ModelStatic<import('sequelize').Model<ProductQuantity, CreateProductQuantity>>} ProductQuantityModel
 */

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @returns {ProductQuantityModel}
 */
export default (sequelize) => {
  const ProductQuantity = sequelize.define(
    'ProductQuantity',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      warehouseId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      tableName: 'ProductQuantity',
      createdAt: 'created',
      updatedAt: 'updated',
      deletedAt: 'deleted',
      paranoid: true,
      freezeTableName: true,
      timestamps: true
    }
  );

  return ProductQuantity;
};

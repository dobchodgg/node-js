const { tableEmpty } = require('../helpers');
const { productQuantities } = require('../data');

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const isTableEmpty = await tableEmpty('ProductQuantity', queryInterface, t);

      if (isTableEmpty) {
        return queryInterface.bulkInsert('ProductQuantity', productQuantities, { transaction: t });
      }

      return true;
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    return queryInterface.bulkDelete('ProductQuantity', {});
  }
};

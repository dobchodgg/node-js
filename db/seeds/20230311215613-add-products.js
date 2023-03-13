const { tableEmpty } = require('../helpers');
const { products } = require('../data');

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const isTableEmpty = await tableEmpty('Product', queryInterface, t);

      if (isTableEmpty) {
        return queryInterface.bulkInsert('Product', products, { transaction: t });
      }

      return true;
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    return queryInterface.bulkDelete('Product', {});
  }
};

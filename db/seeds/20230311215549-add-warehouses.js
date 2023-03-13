const { tableEmpty } = require('../helpers');
const { warehouses } = require('../data');

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const isTableEmpty = await tableEmpty('Warehouse', queryInterface, t);

      if (isTableEmpty) {
        return queryInterface.bulkInsert('Warehouse', warehouses, { transaction: t });
      }

      return true;
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    return queryInterface.bulkDelete('Warehouse', {});
  }
};

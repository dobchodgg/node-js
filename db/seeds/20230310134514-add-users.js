const bcrypt = require('bcrypt');
const { tableEmpty } = require('../helpers');
const { users } = require('../data');

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const isTableEmpty = await tableEmpty('User', queryInterface, t);

      if (isTableEmpty) {
        const salt = bcrypt.genSaltSync(10, 'a');
        const password = bcrypt.hashSync('123456789', salt);

        return queryInterface.bulkInsert('User', users(password), { transaction: t });
      }

      return true;
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    return queryInterface.bulkDelete('User', {});
  }
};

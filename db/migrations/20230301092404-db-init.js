module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up(queryInterface) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');
  },

  async down() {
    return true;
  }
};

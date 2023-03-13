const { QueryTypes } = require('sequelize');

/**
 * @param {string} tableName
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').Transaction} [transaction]
 */
const tableEmpty = async (tableName, queryInterface, transaction = undefined) => {
  const query = `SELECT COUNT(*) AS "count" FROM "${tableName}"`;
  /** @type {{ count: string }[]} */
  const tableQueryResult = await queryInterface.sequelize.query(query, {
    type: QueryTypes.SELECT,
    transaction: transaction
  });

  if (tableQueryResult && tableQueryResult.length > 0 && tableQueryResult[0].count) {
    return Number(tableQueryResult[0].count) <= 0;
  }

  return false;
};

module.exports = { tableEmpty };

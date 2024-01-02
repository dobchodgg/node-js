/**
 * @param {string} order
 * @returns {RegExpMatchArray['groups']|undefined}
 */
const parseOrder = function parseOrder(order) {
  const match = order.match(
    /order:\s(?<order>\w+\s\w+).*address:\s(?<address>\w+\s\w+\s\w+).*payment info:\s(?<payment>\w+)/
  );
  return match?.groups;
};

module.exports = {
  parseOrder
};

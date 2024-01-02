const { parseOrder } = require('./add');

const parsedOrder = parseOrder(
  'I want to to order: 3 books to address: 112 street city here is my payment info: 0123456789'
);
console.log(parsedOrder);

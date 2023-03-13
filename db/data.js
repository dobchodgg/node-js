const bcrypt = require('bcrypt');
const { RIGHTS } = require('../src/express/constants');
const { v4 } = require('uuid');

const users = (password) => {
  return [
    {
      id: '01b21651-ff03-4e0e-9a10-d599300b5e2f',
      email: 'test@example.com',
      password: password,
      rights: RIGHTS.ADMIN,
      created: new Date(),
      updated: new Date(),
      deleted: null
    },
    {
      id: '572542b8-a597-4e96-8ad9-22f9fff163d4',
      email: 'test+read@example.com',
      password: password,
      rights: RIGHTS.READ,
      created: new Date(),
      updated: new Date(),
      deleted: null
    },
    {
      id: '3fe79b82-1246-4faf-9547-bb93db026823',
      email: 'test+write@example.com',
      password: password,
      rights: RIGHTS.WRITE,
      created: new Date(),
      updated: new Date(),
      deleted: null
    }
  ];
};

const warehouses = [
  {
    id: 'ebd55196-e115-4813-be1e-2314d95dd0d7',
    name: 'Warehouse 1',
    description: 'Warehouse 1',
    created: new Date(),
    updated: new Date(),
    deleted: null
  },
  {
    id: '17eda93a-fc70-416d-a15f-927c57aa6c96',
    name: 'Warehouse 2',
    description: 'Warehouse 2',
    created: new Date(),
    updated: new Date(),
    deleted: null
  },
  {
    id: '2ff52b77-eafc-474e-a4ac-017767d0b685',
    name: 'Warehouse 3',
    description: 'Warehouse 3',
    created: new Date(),
    updated: new Date(),
    deleted: null
  }
];

const products = [
  {
    id: '1b490305-a3df-48ab-82c9-fe1bdfa01e9b',
    name: 'Product 1',
    description: 'Product 1',
    sku: 'AAAA-0001',
    created: new Date(),
    updated: new Date(),
    deleted: null
  },
  {
    id: '8519a446-bb8d-45d4-b506-a7bc22c9429d',
    name: 'Product 2',
    description: 'Product 2',
    sku: 'BBBB-0001',
    created: new Date(),
    updated: new Date(),
    deleted: null
  },
  {
    id: '611d6204-d19c-4a79-8cb3-5fa4c407a120',
    name: 'Product 3',
    description: 'Product 3',
    sku: 'BBBB-0001',
    created: new Date(),
    updated: new Date(),
    deleted: null
  }
];

const productQuantities = products.reduce((acc, cur, index) => {
  acc.push({
    id: v4(),
    productId: cur.id,
    warehouseId: warehouses[0].id,
    quantity: (index + 1) * 2,
    created: new Date(),
    updated: new Date(),
    deleted: null
  });
  acc.push({
    id: v4(),
    productId: cur.id,
    warehouseId: warehouses[1].id,
    quantity: (index + 1) * 2,
    created: new Date(),
    updated: new Date(),
    deleted: null
  });
  acc.push({
    id: v4(),
    productId: cur.id,
    warehouseId: warehouses[2].id,
    quantity: (index + 1) * 2,
    created: new Date(),
    updated: new Date(),
    deleted: null
  });

  return acc;
}, []);

module.exports = { users, warehouses, products, productQuantities };

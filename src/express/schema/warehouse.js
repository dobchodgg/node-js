const { body, param } = require('express-validator');

const createWarehouseSchema = [
  body('name').notEmpty({ ignore_whitespace: true }).isString().isLength({ min: 10 }).trim(),
  body('description').notEmpty({ ignore_whitespace: true }).isString().isLength({ min: 10 }).trim()
];
const updateWarehouseSchema = [
  param('id').notEmpty({ ignore_whitespace: true }).isUUID(4),
  body('name').notEmpty({ ignore_whitespace: true }).isString().trim().isLength({ min: 10 }),
  body('description').notEmpty({ ignore_whitespace: true }).isString().trim().isLength({ min: 10 })
];

module.exports = { createWarehouseSchema, updateWarehouseSchema };

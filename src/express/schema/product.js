const { body, param } = require('express-validator');

const createProductSchema = [
  body('name').notEmpty({ ignore_whitespace: true }).isString().isLength({ min: 10 }).trim(),
  body('description').notEmpty({ ignore_whitespace: true }).isString().isLength({ min: 10 }).trim(),
  body('sku').notEmpty({ ignore_whitespace: true }).isString().trim().matches('^[a-zA-Z]{4}-[0-9]{4}$')
];
const updateProductSchema = [
  param('id').notEmpty({ ignore_whitespace: true }).isUUID(4),
  body('name').notEmpty({ ignore_whitespace: true }).isString().trim().isLength({ min: 10 }),
  body('description').notEmpty({ ignore_whitespace: true }).isString().trim().isLength({ min: 10 }),
  body('sku').notEmpty({ ignore_whitespace: true }).isString().trim().matches('^[a-zA-Z]{4}-[0-9]{4}$')
];

module.exports = { createProductSchema, updateProductSchema };

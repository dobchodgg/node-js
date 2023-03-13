const { body, param } = require('express-validator');

const createUserSchema = [
  body('email').notEmpty({ ignore_whitespace: true }).isEmail().normalizeEmail(),
  body('password').notEmpty({ ignore_whitespace: true }).isStrongPassword()
];
const updateUserSchema = [
  param('id').notEmpty({ ignore_whitespace: true }).isUUID(4),
  body('email').notEmpty({ ignore_whitespace: true }).trim().isEmail().normalizeEmail(),
  body('password').notEmpty({ ignore_whitespace: true }).trim().isStrongPassword()
];

module.exports = { createUserSchema, updateUserSchema };

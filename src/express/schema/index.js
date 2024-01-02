const { param, validationResult } = require('express-validator');

const getEntitySchema = [param('id').notEmpty({ ignore_whitespace: true }).isUUID(4)];

const validateData = validationResult.withDefaults({
  formatter: ({ type, msg }) => {
    return `${type}]: ${msg}`;
  }
});

module.exports = { getEntitySchema, validateData };

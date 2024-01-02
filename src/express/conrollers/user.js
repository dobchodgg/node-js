const { omit } = require('lodash');
const { RIGHTS } = require('../constants');
const { db } = require('../db');
const { validateData } = require('../schema');

/**
 * Create and Save a new product
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.create = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const user = await db.User.create({
        email: req.body.email,
        password: req.body.password,
        rights: RIGHTS.READ
      });

      return res.status(201).json({ result: omit(user.get({ plain: true }), ['password']), errors: [] });
    } else {
      return res.status(400).json({ result: null, errors: errors.array() });
    }
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

/**
 * Retrieve all products from the database
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.findAll = async (req, res) => {
  try {
    const users = await db.User.findAll();

    return res
      .status(200)
      .json({ result: users.map((item) => omit(item.get({ plain: true }), ['password'])), errors: [] });
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

/**
 * Find a single product with an id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.findOne = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const product = await db.User.findOne({ where: { id: req.params.id } });

      return res.status(200).json({ result: product || null, errors: [] });
    } else {
      return res.status(400).json({ result: null, errors: errors.array() });
    }
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

/**
 * Update a product by the id in the request
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.update = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const user = await db.User.findByPk(req.params.id);

      if (user) {
        const updatedUser = await user.update({
          password: req.body.password,
          email: req.body.email,
          rights: user.getDataValue('rights')
        });

        return res.status(200).json({ result: omit(updatedUser.get({ plain: true }), ['password']), errors: [] });
      } else {
        return res.status(400).json({ result: null, errors: ['Unable for find entity'] });
      }
    } else {
      return res.status(400).json({ result: null, errors: errors.array() });
    }
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

/**
 * Delete a product with the specified id in the request
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.delete = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const user = await db.User.findByPk(req.params.id);

      if (user) {
        await user.destroy();

        return res.status(200).json({ result: req.params.id, errors: [] });
      } else {
        return res.status(400).json({ result: null, errors: ['Unable for find entity'] });
      }
    } else {
      return res.status(400).json({ result: null, errors: errors.array() });
    }
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

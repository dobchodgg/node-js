const { db } = require('../db');
const { validateData } = require('../schema');

/**
 * Create and Save a new product
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.create = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const product = await db.Product.create({
        description: req.body.description,
        name: req.body.name,
        sku: req.body.sku
      });

      return res.status(201).json({ result: product.get({ plain: true }), errors: [] });
    } else {
      return res.status(400).json({ result: null, errors: errors.array() });
    }
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

/**
 * Retrieve all products from the database
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.findAll = async (req, res) => {
  try {
    const products = await db.Product.findAll();

    return res.status(200).json({ result: products.map((item) => item.get({ plain: true })), errors: [] });
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

/**
 * Retrieve all products from the database
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.quantitiesByProductId = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const product = await db.Product.findByPk(req.params.id, {
        include: { model: db.ProductQuantity, as: 'quantities', all: true }
      });
      const productObject = product != null ? product.get({ plain: true }) : null;
      const result =
        productObject != null && productObject.quantities != null && productObject.quantities.length
          ? productObject.quantities.map((item) => ({ warehouseId: item.warehouseId, quantity: item.quantity }))
          : [];

      return res.status(200).json({ result: result, errors: [] });
    } else {
      return res.status(400).json({ result: null, errors: errors.array() });
    }
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

/**
 * Find a single product with an id
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.findOne = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const product = await db.Product.findOne({ where: { id: req.params.id } });

      return res.status(200).json({ result: product != null ? product.get({ plain: true }) : null, errors: [] });
    } else {
      return res.status(400).json({ result: null, errors: errors.array() });
    }
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

/**
 * Update a product by the id in the request
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.update = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const product = await db.Product.findByPk(req.params.id);

      if (product) {
        const updatedProduct = await product.update({
          name: req.body.name,
          description: req.body.description,
          sku: req.body.sku
        });

        return res.status(200).json({ result: updatedProduct.get({ plain: true }), errors: [] });
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
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.delete = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const product = await db.Product.findByPk(req.params.id);

      if (product) {
        await product.destroy();

        return res.status(200).json({ result: req.body.id, errors: [] });
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

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
      const warehouse = await db.Warehouse.create({
        description: req.body.description,
        name: req.body.name
      });

      return res.status(201).json({ result: warehouse.get({ plain: true }), errors: [] });
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
    const warehouses = await db.Warehouse.findAll();

    return res.status(201).json({ result: warehouses.map((item) => item.get({ plain: true })), errors: [] });
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

/**
 * Retrieve all warehouses from the database
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.storage = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const quantities = await db.ProductQuantity.findAll({ where: { warehouseId: req.params.id } });
      const result = quantities.map((item) => {
        const storage = item.get({ plain: true });

        return {
          productId: storage.productId,
          quantity: storage.productId
        };
      });

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
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.findOne = async (req, res) => {
  try {
    const errors = validateData(req);

    if (errors.isEmpty()) {
      const product = await db.Warehouse.findOne({ where: { id: req.params.id } });

      return res.status(201).json({ result: product || null, errors: [] });
    } else {
      return res.status(500).json({ result: null, errors: errors.array() });
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
      const product = await db.Warehouse.findByPk(req.params.id);

      if (product) {
        const updatedProduct = await product.update({
          name: req.body.name,
          description: req.body.description
        });

        return res.status(201).json({ result: updatedProduct.get({ plain: true }), errors: [] });
      } else {
        return res.status(500).json({ result: null, errors: ['Unable for find entity'] });
      }
    } else {
      return res.status(500).json({ result: null, errors: errors.array() });
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
      const product = await db.Warehouse.findByPk(req.params.id);

      if (product) {
        await product.destroy();

        return res.status(201).json({ result: req.body.id, errors: [] });
      } else {
        return res.status(500).json({ result: null, errors: ['Unable for find entity'] });
      }
    } else {
      return res.status(500).json({ result: null, errors: errors.array() });
    }
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

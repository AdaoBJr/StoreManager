const services = require('../services/products');

const getAll = async (_req, res) => {
  try {
    const products = await services.getAll();

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await services.getById(id);

    res.status(200).json(product);
  } catch (error) {
      res.status(500).json(error);
  }
};

const create = async (req, res) => {
  try {
    const product = req.body;

    const newProduct = await services.create(product);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(error.err.status)
      .json({ err: { code: error.err.code, message: error.err.message } });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await services.create(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await services.remove(id);

    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAll, getById, create, update, remove };

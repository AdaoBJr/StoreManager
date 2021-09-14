const model = require('../models/productModel');
const service = require('../services/productService');

const add = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const products = await service.add({ name, quantity });
    if (products.err) {
    return res.status(422).json(products);
    }
    return res.status(201).json(products);
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
      const products = await model.getAll();
      return res.status(200).json(products);
  } catch (error) {
      return res.status(422).json({ message: 'Wrong id format' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const product = await model.getById(id);
  return res.status(200).json(product);
  } catch (error) {
    return res.status(422).json({ message: 'Wrong id format' });
  }
};

module.exports = { add, getAll, getById };
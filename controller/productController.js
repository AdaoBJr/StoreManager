const model = require('../models/productModel');
const service = require('../services/productService');

const add = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const products = await service.add({ name, quantity });
    return res.status(201).json(products);
  } catch (error) {
    return res.status(422).json(error);
  }
};

const getAll = async (_req, res) => {
  try {
      const products = await model.getAll();
      return res.status(201).json(products);
  } catch (error) {
      return res.status(500).json({ Message: '' });
  }
};

module.exports = { add, getAll };
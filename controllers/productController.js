const productModel = require('../models/productModel');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const id = productModel.create({ name, quantity });
};
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
      return res.status(422).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    if (product.err) {
      return res.status(422).json(product);
    }
  return res.status(200).json(product);
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const updateProduct = await service.update({ id, name, quantity });
    if (updateProduct.err) {
      return res.status(422).json(updateProduct);
    }
  return res.status(200).json(updateProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await service.remove(id);
    if (deleteProduct.err) {
      return res.status(422).json(deleteProduct);
    }
    return res.status(200).json(deleteProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { add, getAll, getById, update, remove };
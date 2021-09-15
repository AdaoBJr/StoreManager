const service = require('../services/productService');

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await service.createProduct({ name, quantity });
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
  } 
};

const getAllProducts = async (_req, res) => {
  try {
    const products = await service.getAll();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await service.updateProduct({ id, name, quantity });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
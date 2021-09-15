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

const excludeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.deleteProduct(id);
    if (product === null) {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  excludeProduct,
};
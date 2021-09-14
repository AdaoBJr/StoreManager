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

module.exports = {
  createProduct,
};
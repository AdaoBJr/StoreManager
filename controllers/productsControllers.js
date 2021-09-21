const { createProduct } = require('../services/productServices');

const addProduct = async (req, res) => {
    const { name, quantity } = req.body;
  
    const product = await createProduct({ name, quantity });
    return res.status(201).json(product);
};

module.exports = { addProduct };
const express = require('express');

const productsRouter = express.Router();
const rescue = require('express-rescue'); 

const { checkName, checkAllProducts, checkProductById } = require('../services/productService');
const { validateProductInput } = require('../middlewares/errorProducts');

productsRouter.get('/', rescue(async (_req, res) => {
    const products = await checkAllProducts();
 
   return res.status(200).json({ products });
}));

productsRouter.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
 
    const productId = await checkProductById(id);
    if (productId.isError) {
     return next(productId);
    }

   return res.status(200).json(productId);
}));

productsRouter.post('/', validateProductInput, async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    
    const product = await checkName(name, quantity);
  
    if (product.isError) {
      return next(product);
    }
    
    const newProduct = {
      _id: product.insertedId,
      name,
      quantity,
    };
    
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
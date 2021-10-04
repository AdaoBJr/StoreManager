const express = require('express');
const productsService = require('../services/productService');

const productsRouter = express.Router();

productsRouter.get('/', async (_req, res) => {
    const { status, messageResult } = await productsService.getAllProducts();
    return res.status(status).json(messageResult);
});

productsRouter.post('/', async (req, res) => {
    const { name, quantity } = req.body;
    const { status, messageResult } = await productsService.createProduct({ name, quantity });
    return res.status(status, messageResult);
});

productsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    const { status, messageResult } = await productsService.getProductById(id);
  
    return res.status(status).json(messageResult);
  });

  productsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const { status, messageResult } = await productsService.updateProduct({ id, name, quantity });
  
    return res.status(status).json(messageResult);
  });

  productsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    const { status, messageResult } = await productsService.removeProduct(id);
  
    return res.status(status).json(messageResult);
  });

module.exports = {
    productsRouter,
};

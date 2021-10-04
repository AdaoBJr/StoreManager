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

module.exports = {
    productsRouter,
};

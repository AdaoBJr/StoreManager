const express = require('express');

const ProductService = require('../services/productsServices');

const ProductRoutes = express.Router();

ProductRoutes.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductService.createProduct({ name, quantity });

  if (product.err) return res.status(422).json(product);

  res.status(201).json(product);
});

ProductRoutes.get('/', async (req, res) => {
  const product = await ProductService.getAll();

  res.status(200).json(product);
});

ProductRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;

  const productId = await ProductService.getProductById(id);

  if (productId.err) return res.status(422).json(productId);

  res.status(200).json(productId);
});

ProductRoutes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductService.updateProduct(id, { name, quantity });

  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
});

ProductRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await ProductService.deleteProduct(id);

  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
});

// const getAll = async (req, res) => {
//   const products = await ProductService.getAll();  

//   res.status(200).json(products);
// };

// const create = async (req, res) => { 
//   const { name, quantity } = req.body;

//   const product = await ProductService.createProduct({ name, quantity });  

//   if (product.err) return res.status(422).json(product);

//   return res.status(200).json(product);
// };

// const findById = rescue(async (req, res) => {
//   const { id } = req.params;
  
// })

module.exports = ProductRoutes; 
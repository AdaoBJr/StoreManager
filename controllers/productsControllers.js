const rescue = require('express-rescue');
const ProductService = require('../services/productsService');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const Obj = await ProductService.createProduct(name, quantity);
  if (Obj.err) {
   return res.status(422).json(Obj);
  } 
  return res.status(201).json(Obj.product);
});

module.exports = { createProduct };
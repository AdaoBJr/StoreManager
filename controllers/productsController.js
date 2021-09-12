const ProductsService = require('../services/productsService');

const createProd = async (req, res) => {
  const { name, quantity } = req.body;

  const { id: _id } = await ProductsService.create({ name, quantity });
  
  return res.status(201).json({ _id, name, quantity });
};

const getAllProds = async (req, res) => {
  const { products } = await ProductsService.getAll();
  
  return res.status(200).json({ products });
};

const findByIdProds = async (req, res) => {
  const { id } = req.params;
  
  const { product } = await ProductsService
   .findById({ id });

  return res.status(200).json(product);
};

const updateProd = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  await ProductsService
   .update({ id, name, quantity });

  return res.status(200).json({ id, name, quantity });
};

const deleteProd = async (req, res) => {
  const { id } = req.params;
  
  const { product } = await ProductsService
   .deleteProd({ id });

  return res.status(200).json(product);
};

module.exports = {
  createProd,
  getAllProds,
  findByIdProds,
  updateProd,
  deleteProd,
};
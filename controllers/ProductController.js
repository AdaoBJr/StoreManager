const ProductService = require('../services/ProductService');

const getAllProducts = async (req, res) => {
  const allProducts = await ProductService.getAll();

  res.status(200).json({ products: allProducts });
};

const findProductById = async (req, res) => {
  const { id } = req.params;

  const productById = await ProductService.findById(id);

  if (productById.err) {
    return res.status(422).json({ err: productById.err });
  }

  res.status(200).json(productById);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const productCreated = await ProductService.create(name, quantity);

  if (productCreated.err) {
    return res.status(422).json({ err: productCreated.err });
  }
    
  res.status(201).json(productCreated);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const productUpdate = await ProductService.update(id, name, quantity);

  if (productUpdate.err) {
    return res.status(422).json({ err: productUpdate.err });
  }

  res.status(200).json(productUpdate);
};

const excludeProduct = async (req, res) => {
  const { id } = req.params;

  const productExclude = await ProductService.exclude(id);

  if (productExclude.err) {
    return res.status(422).json({ err: productExclude.err });
  }

  res.status(200).json({ message: 'excluded product' });
};

module.exports = {
  getAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  excludeProduct,
};
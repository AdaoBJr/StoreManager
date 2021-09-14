const Products = require('../services/Products');

const getAllProducts = async (_req, res) => {
  const products = await Products.getAllProducts();

  res.status(200).json({ products });
};

const findProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Products.findProductById(id);

  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
};

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const validations = await Products.validate({ name, quantity });

  if (validations.err) {
    return res.status(422).json(validations);
  }

  next();
};

const validateProductId = async (req, res, next) => {
  const { id } = req.params;

  const validation = Products.checkValidId(id);

  if (validation.err) {
    return res.status(422).json(validation);
  }

  next();
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await Products.createProduct({ name, quantity });

  res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const updatedProduct = await Products.updateProduct({ name, quantity }, id);

  res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Products.deleteProduct(id);

  res.status(200).json(deletedProduct);
};

module.exports = {
  getAllProducts,
  findProductById,
  validateProduct,
  validateProductId,
  createProduct,
  updateProduct,
  deleteProduct,
};

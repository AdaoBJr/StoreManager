const Products = require('../services/Products');

const getAllProducts = async (_req, res) => {
  const products = await Products.getAllProducts();

  res.status(200).json({ products });
};

const findProductById = async (req, res) => {
  const { id } = req.query;

  const product = await Products.findProductById(id);

  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
};

const getProducts = async (req, res) => {
  const { id } = req.query;

  if (id) {
    findProductById(req, res);
  } else {
    getAllProducts(req, res);
  }
};

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const validations = await Products.validate({ name, quantity });
  console.log(validations);

  if (validations.err) {
    return res.status(422).json(validations);
  }

  next();
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await Products.createProduct({ name, quantity });

  res.status(201).json(newProduct);
};

module.exports = {
  getProducts,
  validateProduct,
  createProduct,
};

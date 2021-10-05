const Service = require('../services');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_UNPROCESSABLE = 422;

const storeProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const products = await Service.products.storeProduct({ name, quantity });

  if (products.err) return res.status(STATUS_UNPROCESSABLE).json(products);

  res.status(STATUS_CREATED).json(products);
};

const getAllProducts = async (_req, res) => {
  const allProducts = await Service.products.getAllProducts();

  return res.status(STATUS_OK).json(allProducts);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const products = await Service.products.getProductsById(id);

  if (products.err) return res.status(STATUS_UNPROCESSABLE).json(products);

  res.status(STATUS_OK).json(products);
};

const updatedProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await Service.products.updatedProduct(id, { name, quantity });

  if (product.err) return res.status(STATUS_UNPROCESSABLE).json(product);

  res.status(STATUS_OK).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Service.products.deleteProduct(id);

  if (product.err) return res.status(STATUS_UNPROCESSABLE).json(product);

  res.status(STATUS_OK).json(product);
};

module.exports = {
  storeProduct,
  getAllProducts,
  getProductsById,
  updatedProduct,
  deleteProduct,
};
const Service = require('../services');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPROCESSABLE_STATUS = 422;

const storeProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await Service.products.storeProduct({ name, quantity });

  if (product.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(product);

  res.status(HTTP_CREATED_STATUS).json(product);
};

const getAllProducts = async (_req, res) => {
  const products = await Service.products.getAllProducts();

  res.status(HTTP_OK_STATUS).json(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const product = await Service.products.getProductsById(id);

  if (product.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(product);

  res.status(HTTP_OK_STATUS).json(product);
};

const updatedProduct = async (req, res) => {
  const { id } = req.params;

  const { name, quantity } = req.body;

  const product = await Service.products.updatedProduct(id, { name, quantity });

  if (product.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(product);

  res.status(HTTP_OK_STATUS).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Service.products.deleteProduct(id);

  if (product.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(product);

  res.status(HTTP_OK_STATUS).json(product);
};

module.exports = {
  storeProduct,
  getAllProducts,
  getProductsById,
  updatedProduct,
  deleteProduct,
};
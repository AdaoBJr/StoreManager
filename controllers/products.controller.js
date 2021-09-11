const {
  createProduct,
  getProducts,
  getProductPerId,
  getUpdatedProduct,
  removeProduct,
} = require('../services/products.service');

const createNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await createProduct({ name, quantity });
  return res.status(201).json(newProduct);
};

const getAllProducts = async (req, res) => {
  const allProducts = await getProducts();
  return res.status(200).json({ products: allProducts });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const products = await getProductPerId(id);
  if (products.status === 200) return res.status(200).json(products.product);
  return res.status(products.status).json(products.err);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await getUpdatedProduct({ id, name, quantity });
  if (product) return res.status(200).json({ id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await removeProduct(id);
  if (product) return res.status(200).json(product);
  return res.status(422).json({
    err: { code: 'invalid_data', message: 'Wrong id format' },
  });
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
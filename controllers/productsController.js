const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  removeProduct,
} = require('../services/productService');

const STATUS_CREATED_SUCCESS = 201;
const STATUS_SUCCESS = 200;
const BAD_REQUEST = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await createProduct(name, quantity);

  if (product.err) return res.status(BAD_REQUEST).json(product);
  return res.status(STATUS_CREATED_SUCCESS).json({ ...product });
};

const getAll = async (req, res) => {
  const products = await getAllProducts();
  res.status(STATUS_SUCCESS).json(products);
};

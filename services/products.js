const product = require('../models/products');
const Error = require('../utils/manageErrors');

const create = async (good) => {
  const checkproduct = await product.findProduct(good.name);
  if (checkproduct) return Error.conflict('Product already exists');
  return product.createProduct(good);
};

const getProduct = async () => product.getAllProducts();
const updateById = async (id, name, quantity) => product.updateProduct(id, name, quantity);
const deleteProductById = async (id) => product.deleteProduct(id);

module.exports = {
  create,
  getProduct,
  getProductById: product.getProductById,
  updateById,
  deleteProductById,
};

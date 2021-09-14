const { 
  productExists,
  newProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../models/Products');

const createProduct = async (name, quantity) => {
  const product = await productExists(name);

  if (product) return true;

  const newestProduct = await newProduct(name, quantity);

  return newestProduct;
};

const receiveProductsList = async () => {
  const productList = await getAllProducts();
  
  return productList;
};

const receiveProductById = async (id) => {
  const productById = await getProductById(id);

  if (productById) {
    return productById;
  }

  return null;
};

const attProductById = async (id, name, quantity) => {
  const updateProduct = await updateProductById(id, name, quantity);

  if (updateProduct) {
    return updateProduct;
  }

  return null;
};

const delProductById = async (id) => {
  const deletedProduct = await deleteProductById(id);

  if (deletedProduct) {
    return deletedProduct;
  }

  return null;
};

module.exports = {
  createProduct,
  receiveProductsList,
  receiveProductById,
  attProductById,
  delProductById,
};

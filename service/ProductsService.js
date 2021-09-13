const ProductsModel = require('../models/ProductsModel');

const createProduct = async (name, quantity) => {
  const isHaveName = await ProductsModel.findByName(name);
  if (isHaveName) {
    return { err: {
      code: 'INVALID_DATA',
      message: 'Product already exists',
    } };
  }
 const newProduct = await ProductsModel.createProduct(name, quantity);
 return newProduct;
};
const getAll = async () => {
  const getAllProducts = await ProductsModel.getAllProducts();
  if (!getAllProducts) return null;
  return getAllProducts;
};
const getProductById = async (id) => {
  const getProduct = await ProductsModel.getProductById(id);
  console.log(getProduct, 'service');
  if (!getProduct) {
    return {
      err: {
        code: 'INVALID_DATA',
        message: 'Wrong id format',
      },
    };
  }
  return getProduct;
};
module.exports = {
  createProduct,
  getAll,
  getProductById,
};
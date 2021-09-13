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
const deleteData = async (id) => {
  console.log(id);
const deleteProduct = await ProductsModel.deleteProduct(id);
if (!deleteProduct) {
  return {
    err: {
      code: 'INVALID_DATA',
      message: 'Wrong id format',
    },
  };
}
return deleteProduct;
};
const updateProduct = async (id, name, quantity) => {
const updateData = await ProductsModel.updateProduct(id, name, quantity);
return updateData;
};
module.exports = {
  createProduct,
  getAll,
  getProductById,
  deleteData,
  updateProduct,
};
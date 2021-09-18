const ProductModel = require('../models/ProductModel');
const {
  validateProductName,
  validateProductQuantity,
  validateId,
} = require('../middlewares/validations');

const create = async (name, quantity) => {
  const isProductNameValid = validateProductName(name);
  const isQuantityValid = validateProductQuantity(quantity);
  
  if (isProductNameValid.err) return isProductNameValid;
  if (isQuantityValid.err) return isQuantityValid;

  const searchProduct = await ProductModel.findByName(name);
  if (searchProduct) return { err: { code: 'invalid_data', message: 'Product already exists' } };

  const createdProduct = await ProductModel.create(name, quantity);
  return createdProduct;
};

const getAll = async () => {
  const products = await ProductModel.getAll('products');
  return products;
};

const findById = async (id) => {
  const idValid = validateId(id);
  if (idValid.err) return idValid;

  const product = await ProductModel.findById(id, 'products');
  return product;
};

const update = async (id, name, quantity) => {
  const isProductNameValid = validateProductName(name);
  const isQuantityValid = validateProductQuantity(quantity);
  if (isProductNameValid.err) return isProductNameValid;
  if (isQuantityValid.err) return isQuantityValid;
  const resultModel = await ProductModel.update(id, name, quantity);
  return resultModel;
};

const deleteById = async (id) => {
  const isValidId = validateId(id);
  if (isValidId.err) return isValidId;
  const deletedProduct = await ProductModel.deleteById(id, 'products');
  if (!deletedProduct) return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  return deletedProduct;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteById,
};
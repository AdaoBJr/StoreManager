const ProductsModel = require('../models/ProductsModel');

const shortName = {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
};

const productAlreadyExists = {
    code: 'invalid_data',
    message: 'Product already exists',
};

const invalidQuantity = {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
};

const quantityNotNumber = {
    code: 'invalid_data',
    message: '"quantity" must be a number',
};

const validateName = (name) => {
  if (name.length < 5) return shortName;
  return true;
};

const validateQuantity = (quantity) => {
  if (quantity < 1) return invalidQuantity;
  if (typeof quantity !== 'number') return quantityNotNumber;
  return true;
};

const create = async (name, quantity) => {
  const isNameValid = validateName(name); 
  if (!isNameValid) return isNameValid;

  const repeatedProduct = await ProductsModel.findOne(name);
  if (repeatedProduct) return productAlreadyExists;

  const isQuantityValid = validateQuantity(quantity);
  if (!isQuantityValid) return isQuantityValid;

  const { id } = await ProductsModel
    .create({ name, quantity });
  
  return {
    code: 201,
    id,
    name,
    quantity,
  };
};

const getNewProduct = (productData) => {
  const { id, name, quantity } = productData;
  return { id, name, quantity };
};

const getAll = async () => {
  const productsData = await ProductsModel.getAll();
  return productsData.map(getNewProduct);
};

module.exports = {
  create,
  getAll,
};
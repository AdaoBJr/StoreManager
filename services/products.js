const modelsProduct = require('../models/products');
const {
  isIdValid,
  isNameValid,
  isProductExists,
  isQuantityValid,
} = require('../schemas/products');

const create = async ({ name, quantity }) => {
  const validationName = isNameValid(name);
  
  if (validationName.err) return validationName;
  const validationQuantity = isQuantityValid(quantity);
  
  if (validationQuantity.err) return validationQuantity;
  const productExists = await isProductExists(name);
  
  if (productExists.err) return productExists;
  const newProduct = await modelsProduct.create({ name, quantity });
  
  return { code: 201, newProduct };
};

const getAll = async () => {
  const products = await modelsProduct.getAll();
  return { code: 200, products };
};

const getById = async (id) => {
  const isValid = isIdValid(id);
  if (isValid.err) return isValid;
  const product = await modelsProduct.getById(id);
  if (!product) {
    return {
      code: 422,
      err: {
        code: 'invalid_data', message: 'Wrong id format',
      },
    };
  }
  return { code: 200, product };
};

const update = async (id, updates) => {
  const { name, quantity } = updates;
  const validationName = isNameValid(name);
  if (validationName.err) return validationName;
  const validationQuantity = isQuantityValid(quantity);
  if (validationQuantity.err) return validationQuantity;
  const isValid = isIdValid(id);
  if (isValid.err) return isValid;
  const updatedProduct = await modelsProduct.update(id, updates);
  return { code: 200, updatedProduct };
};

const exclude = async (id) => {
  const isValid = isIdValid(id);
  if (isValid.err) return isValid;
  const product = await modelsProduct.getById(id);
  if (!product) {
    return {
      code: 422,
      err: {
        code: 'invalid_data', message: 'Wrong id format',
      },
    };
  }
  await modelsProduct.exclude(id);
  return { code: 200, product };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};

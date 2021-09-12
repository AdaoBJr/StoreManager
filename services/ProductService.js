const ProductModel = require('../models/ProductModel');

const CREATED = 201;

const nameRequired = {
  code: 'invalid_data',
  message: 'name is required',
};

const shortName = {
  code: 'invalid_data',
  message: '"name" length must be at least 5 characters long',
};

const lowQuantity = {
  code: 'invalid_data',
  message: '"quantity" must be larger than or equal to 1',
};

const quantityNotNumber = {
  code: 'invalid_data',
  message: '"quantity" must be a number',
};

const emptyQuantity = {
  code: 'invalid_data',
  message: '"quantity" is required',
};

const invalidId = {
  code: 'invalid_data',
  message: 'Wrong id format',
};

// const cannotFindProducts = {
//   code: 422,
//   message: 'It was not possible to return the products',
// };

const isValidName = (name) => {
  if (!name) return nameRequired;
  if (name.length < 5) return shortName;
  return true;
};

const isValidQuantity = (quantity) => {
  if (quantity < 1) {
    return lowQuantity;
}
  if (!quantity) return emptyQuantity;

  if (typeof quantity !== 'number') {
     return quantityNotNumber; 
}

  return true;
}; 

const create = async (name, quantity) => {
  const isProductNameValid = isValidName(name);
  const isQuantityValid = isValidQuantity(quantity);
  if (isProductNameValid !== true) return isProductNameValid;
  if (isQuantityValid !== true) return isQuantityValid;

  const searchProduct = await ProductModel.findByName(name);
  if (searchProduct) return { code: 'invalid_data', message: 'Product already exists' };

  const { id } = await ProductModel
    .create({ name, quantity });

  return {
    code: CREATED,
    id,
    name,
    quantity,
  };
};

// const getNewProduct = (productData) => {
//   const { id, name, quantity } = productData;

//   return { id, name, quantity };
// };

// const getAll = async () => {
//   const productsData = await ProductModel
//     .getAll();
//   if (!productsData) return cannotFindProducts;
//   return productsData.map(getNewProduct);
// };

const findById = async (id) => {
  const productData = await ProductModel
    .findById(id);
  if (!productData) return invalidId;
  
  return productData;
};

module.exports = {
  create,
  // getAll,
  findById,
};  
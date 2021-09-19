const productModel = require('../models/productModel');

const nameValidation = (name) => {
  if (name.length < 5 || typeof name !== 'string') {
    return false;
  }
  return true;
};

const quantityValidation = (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};

const quantityTypeValidation = (quantity) => {
  if (typeof quantity !== 'number') {
    return false;
  }
  return true;
};

const createProductValidation = async (name, quantity) => {
  const validatedName = nameValidation(name);
  const validatedQuantity = quantityValidation(quantity);
  const validatedTypeQuantity = quantityTypeValidation(quantity);
  const validatedNotEqualName = await productModel.findProductByName(name);
  const { id } = await productModel.createProduct(name, quantity);
  if (!validatedName) {
    return { code: 'invalid_data', message: '"name" length must be at least 5 characters long' };
  }
  if (!validatedQuantity) {
    return { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }
  if (!validatedTypeQuantity) {
    return { code: 'invalid_data', message: '"quantity" must be a number' };
  }
  if (validatedNotEqualName) {
    return { code: 'invalid_data', message: 'Product already exists' };
  }
  return { _id: id, name, quantity };
};

module.exports = {
  createProductValidation,
};

// const productModel = require('../models/productModel');

// const nameValidation = (name) => {
//   if (name.length <= 5 || typeof name !== 'string') {
//     return false;
//   }
//   return true;
// };

// const quantityValidation = (quantity) => {
//   if (quantity <= 0 || typeof quantity !== 'number') {
//     return false;
//   }
//   return true;
// };

// const addProduct = async ({ name, quantity }) => {
//   const validatedName = nameValidation(name);
//   const validatedQuantity = quantityValidation(quantity);

//   if (!validatedName || !validatedQuantity) {
//     return false;
//   }

//   const { id } = await productModel.createProduct({ name, quantity });

//   return {
//     id,
//     name,
//     quantity,
//   };
// };

// const idVerification = async (id) => {
//   const product = productModel.getProductsById(id);

//   if (!product) {
//     return null;
//   }

//   return product;
// };

// const getAllProducts = async () => {
//   const products = productModel.getAllProducts();

//   if (!products) {
//     return null;
//   }

//   return products;
// };

// module.exports = {
//   nameValidation,
//   quantityValidation,
//   addProduct,
//   idVerification,
//   getAllProducts,
// };

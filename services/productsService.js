const Joi = require('joi');
const productsModels = require('../models/productsModel');

const validateName = (name) => {
  const isValid = Joi.string().min(5)
  .validate(name);
  console.log(isValid.error);
  if (isValid.error) {
    return {
      err: { 
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return false;
};

const validateQuantity = (quantity) => {
  if (typeof quantity === 'string') {
    return { 
      err: { 
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  if (quantity < 1) {
    return { 
      err: { 
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  return false;
};

const isProductUnique = async (newProduct) => {
  const dataCheck = await productsModels.getProductByName(newProduct);
  if (dataCheck.length > 0) {
    return { 
      err: { 
        code: 'invalid_data',
        message: 'Product already exists',
      },
    }; 
  }
  return false;
};

const validateProduct = async (product) => {
  const { name, quantity } = product;
  const nameNotValid = validateName(name);
  const quantityNotValid = validateQuantity(quantity);
    if (nameNotValid) return nameNotValid;
    if (quantityNotValid) return quantityNotValid;
    return false;
};

const registerNewProduct = async (newProduct) => {
  const isNotValid = await validateProduct(newProduct);
  const productNotUnique = await isProductUnique(newProduct);

  if (isNotValid) return isNotValid;
  if (productNotUnique) return productNotUnique;
  return productsModels.registerNewProduct(newProduct);
};

const getProductById = async (id) => {
 const product = await productsModels.getProductById(id);
 if (!product) {
  return { 
    err: { 
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  }; 
}
return product;
};

const updateProduct = async (product) => {
  const isNotValid = await validateProduct(product);
  if (isNotValid) return isNotValid;
  return productsModels.updateProduct(product);
};

module.exports = {
  registerNewProduct,
  getProductById,
  updateProduct,
};

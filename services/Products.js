const Products = require('../models/Products');

const validations = require('../schemas/validations');

const registerNewProduct = async (name, quantity) => {
  const validateName = await validations.validateName(name);
  if (validateName.message) return { code: validateName.code, message: validateName.message };

  const validateRepeatedProduct = await validations.validateRepeatedProduct(name);
  if (validateRepeatedProduct.message) {
    return { code: validateRepeatedProduct.code, message: validateRepeatedProduct.message };
  }

  const validateQty = validations.validateQuantity(quantity);
  if (validateQty.message) return { code: validateQty.code, message: validateQty.message };
  
  const addedProduct = await Products.registerNewProduct(name, quantity);
  if (addedProduct.message) return { message: addedProduct.message };

  return addedProduct;
};

const getAllProducts = async () => {
  const allProducts = await Products.getAllProducts();
  if (allProducts.message) return { message: allProducts.message };

  return {
    products: allProducts,
  };
};

const getProductById = async (id) => {
  const validateIdMongo = validations.validateIdMongo(id);
  if (validateIdMongo.message) {
    return {
      code: validateIdMongo.code,
      message: validateIdMongo.message,
    };
  }

  const product = await Products.getProductById(id);
  if (product.message) return { message: product.message };

  const validateIfProductExists = validations.validateIfProductExists(product);
  if (validateIfProductExists.message) {
    return {
      code: validateIfProductExists.code,
      message: validateIfProductExists.message,
    };
  }

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const validateIdMongo = validations.validateIdMongo(id);
  if (validateIdMongo.message) {
    return {
      code: validateIdMongo.code,
      message: validateIdMongo.message,
    };
  }

  const validateName = await validations.validateName(name);
  if (validateName.message) return { code: validateName.code, message: validateName.message };

  const validateQty = validations.validateQuantity(quantity);
  if (validateQty.message) return { code: validateQty.code, message: validateQty.message };

  const updatedProduct = await Products.updateProduct(id, name, quantity);
  if (updatedProduct.message) return { message: updatedProduct.message };

  return updatedProduct;
};

module.exports = {
  registerNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};

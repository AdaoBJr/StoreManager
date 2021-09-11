const Products = require('../models/Products');

const validations = require('../schemas/validations');

const registerNewProduct = async (name, quantity) => {
  const validateName = await validations.validateName(name);
  if (validateName.message) return { code: validateName.code, message: validateName.message };

  const validateQty = validations.validateQuantity(quantity);
  if (validateQty.message) return { code: validateQty.code, message: validateQty.message };
  
  const addedProduct = await Products.registerNewProduct(name, quantity);
  if (addedProduct.message) return { message: addedProduct.message };

  return addedProduct;
};

module.exports = {
  registerNewProduct,
};

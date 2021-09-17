const productsModel = require('../models/productsModel');

const CHARACTERS_MIN = 5;
const MINIMUN_AMOUNT = 0;
const chekName = (name) => {
  if (name.length < CHARACTERS_MIN) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
};

const checkProductExist = async (name) => {
  const product = await productsModel.findByName(name);
  if (product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
};

const chekQuantity = (quantity) => {
  if (quantity <= MINIMUN_AMOUNT) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
};

const validateToType = (quantity) => {
  if (typeof quantity === 'string') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
};

const registerProducts = async (name, quantity) => {
  if (chekName(name)) return chekName(name);
  if (await checkProductExist(name)) return checkProductExist(name);
  if (chekQuantity(quantity)) return chekQuantity(quantity);
  if (validateToType(quantity)) return validateToType(quantity);

  const newProduct = await productsModel.registerProducts(name, quantity);

  return newProduct;
};

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  const allProducts = { products: [...products] };

  return allProducts;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (product === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

const updateProduct = async (id, name, quantity) => {
  if (chekName(name)) return chekName(name);
  if (chekQuantity(quantity)) return chekQuantity(quantity);
  if (validateToType(quantity)) return validateToType(quantity);

  const newProduct = await productsModel.updateProduct(id, name, quantity);
  return newProduct;
};

const deleteProduct = async (id) => {
  const product = await productsModel.deleteProduct(id);
  if (product === false) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  
  return product;
};

module.exports = {
  registerProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

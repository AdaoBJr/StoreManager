// const { ObjectId } = require('mongodb');
const productsModel = require('../models/products');

const validateProductDataName = async (name) => {
  if (typeof name !== 'string' || name.length < 5) {
    return ({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  if (await productsModel.getProductByNameFromDB(name)) {
    return ({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
};

const validateProductDataQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    return ({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= 0) {
    return ({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
};

const validateProductData = async ({ name, quantity }) => (
  (await validateProductDataName(name)) || validateProductDataQuantity(quantity)
);

const addNewProduct = (product) => {
  const err = validateProductData(product);
  if (err) return err;
  return productsModel.addProductToDB(product);
};

module.exports = {
  addNewProduct,
};

const model = require('../Models/product');

const nameLenght = (name) => {
  if (name.length < 5) {
    const error = new Error();
    error.statusCode = 'invalidName';
    throw error;
  }
};

const checkQ = (quantity) => {
  if (quantity < 1) {
    const error = new Error();
    error.statusCode = 'invalidQuantity';
    throw error;
  }

  if (typeof quantity !== 'number') {
    const error = new Error();
    error.statusCode = 'invalidQuantityType';
    throw error;
  }
};

const findByName = async (name) => {
  const product = await model.findByName(name);
  if (product) {
    const error = new Error();
    error.statusCode = 'alreadyExists';
    throw error;
  }
};

const createProduct = async (name, quantity) => {
  nameLenght(name);
  checkQ(quantity);
  await findByName(name);
  const result = await model.createProduct(name, quantity);
  return result;
};

module.exports = {
  createProduct,
};

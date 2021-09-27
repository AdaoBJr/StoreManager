const model = require('../Models/product');

const checkName = (name) => {
  if (name.length < 5) {
    const error = new Error();
    error.statusCode = 'invalidName';
    throw error;
  }
};

const checkQntty = (quantity) => {
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

const findName = async (name) => {
  const product = await model.findByName(name);
  if (product) {
    const error = new Error();
    error.statusCode = 'alreadyExists';
    throw error;
  }
};

const checkPrd = async (name, quantity) => {
  checkName(name);
  checkQntty(quantity);
  await findName(name);
  const result = await model.checkPrd(name, quantity);
  return result;
};

module.exports = {
  checkPrd,
};

const checkNameLength = (name) => {
  if (name.length < 5) {
    const e = new Error();
    e.statusCode = 'invalidName';
    throw e;
  }
};

const checkValidQuantity = (quantity) => {
  if (quantity < 1) {
    const e = new Error();
    e.statusCode = 'invalidQuantity';
    throw e;
  }

  if (typeof quantity !== 'number') {
    const e = new Error();
    e.statusCode = 'invalidQuantityType';
    throw e;
  }
};
  
const checkProductId = (productId) => {
  if (!productId) {
    const e = new Error();
    e.statusCode = 'invalidIdFormat';
    throw e;
  }
};
  
const findProductByName = async (name, callback) => {
  const product = await callback(name);
  if (product) {
    const e = new Error();
    e.statusCode = 'alreadyExists';
    throw e;
  }
};
  
module.exports = {
  checkNameLength,
  checkValidQuantity,
  checkProductId,
  findProductByName,
};

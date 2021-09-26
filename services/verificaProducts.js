const models = require('../models/productModels');

const nameExists = async (name) => {
  const getName = await models.getByName(name);
  if (getName) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
};
  
const nameMinLength = 5;

const verificaName = ({ name }) => {
  if (name.length < nameMinLength) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
};
 const verificaQuantity = (quantity) => {
  if (quantity <= 0 || typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
 };

 const getProducts = async (id) => {
  if (!id) {
    const allProducts = await models.getAllProducts();
    return allProducts;
  }
  const productById = await models.getProductById(id);

  if (!productById) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return productById;
};
module.exports = { verificaName, verificaQuantity, nameExists, getProducts };

// requisito realizado com ajuda de colegas
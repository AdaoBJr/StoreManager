const connection = require('../models/connection');

const nameValidator = (name) => {
  if ((!name) || (name.length < 5)) {
      return { err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
       },
       code: 422 };
    }
    return false;
  };
  
  const quantityValidator = (quantity) => {
    if (typeof quantity !== 'number') {
      return { err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    }, 
    code: 422,
   };
  }
  
    if (quantity <= 0) {
      return {
        err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
       }, 
       code: 422 };
    }
    return false;
  };
  
  const productValidator = async (name) => {
    const db = await connection();
      
    const productOK = await db.collection('products').findOne({ name }); 
  
    if (productOK) {
      return {
        err: {
        code: 'invalid_data',
        message: 'Product already exists',
       },
       code: 422 };
  }
  return false;
  };

const allValidator = (name, quantity) => {
  const invalidName = nameValidator(name);
  const invalidQt = quantityValidator(quantity);
  const invalidProd = productValidator(name);

  if (invalidName) {
    return invalidName;
  }
  if (invalidQt) {
    return invalidQt;
  }
  if (invalidProd) {
    return invalidProd;
  }

  return false;
};

module.exports = {
 allValidator,
};
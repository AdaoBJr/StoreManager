const productExists = (existingProduct) => {
  if (existingProduct) {
    return {
      number: 422,
      error: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
};

const validateLenghtName = ({ name }) => {
  if (name.length < 5) {
    return {
      number: 422,
      error: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
};

const validateQuantityType = ({ quantity }) => {
  if (typeof quantity !== 'number') {
      return { 
      number: 422,
      error: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
};

const validateQuantity = ({ quantity }) => {
  if (quantity <= 0) {
    return { 
      number: 422,
      error: { 
        code: 'invalid_data', 
        message: '"quantity" must be larger than or equal to 1', 
      }, 
    };
  }
};

const isValidated = ({ name, quantity }) => {
  const validateFunctions = [
    validateLenghtName,
    validateQuantityType,
    validateQuantity,
  ];

  for (let i = 0; i < validateFunctions.length; i += 1) {
    const isValid = validateFunctions[i]({ name, quantity });
    if (isValid) return (isValid);
  }
};

const validateSale = (saleArray) => {
  for (let index = 0; index < saleArray.length; index += 1) {
    if (saleArray[index].quantity <= 0 || typeof saleArray[index].quantity === 'string') {
      return { 
        number: 422,
        error: { 
          code: 'invalid_data', 
          message: 'Wrong product ID or invalid quantity', 
        }, 
      };
    }
  }
};

module.exports = {
  productExists,
  isValidated,
  validateSale,
};
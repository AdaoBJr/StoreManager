const productExists = ({ existingProduct }) => {
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

const isValidated = ({ name, quantity, existingProduct }) => {
  const validateFunctions = [
    productExists,
    validateLenghtName,
    validateQuantityType,
    validateQuantity,
  ];

  for (let i = 0; i < validateFunctions.length; i += 1) {
    const isValid = validateFunctions[i]({ name, quantity, existingProduct });
    if (isValid) return (isValid);
  }
};

module.exports = {
  isValidated,
};
const isNameValid = (name) => {
  if (name.length < 5) {
    return {
      err:
        { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }
  // if (typeof name !== 'string') {
  //   return {
  //     err:
  //       { code: 'invalid_data', message: 'O nome deve ser uma string' },
  //   };
  // }

  if (!name) {
    return {
      err:
        { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }

  return {};
};

const isQuantityValid = (quantity) => {
  if (quantity < 0) {
    return {
      err:
        { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }
  if (quantity === 0) {
    return {
      err:
        { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }

  return {};
};

const isQuantityValidTwo = (quantity) => {
  if (typeof quantity === 'string') {
    return {
      err:
        { code: 'invalid_data', message: '"quantity" must be a number' },
    };
  }
  if (typeof quantity !== 'number') {
    return {
      err:
        { code: 'invalid_data', message: '"quantity" must be a number' },
    };
  }

  return {};
};

module.exports = {
  isNameValid,
  isQuantityValid,
  isQuantityValidTwo,
};
const isNameValid = (name) => {
  if (name.length < 5) {
    return {
      err:
        { code: 422, message: 'Nome deve ter mais que 5 caracteres' },
    };
  }
  if (typeof name !== 'string') {
    return {
      err:
        { code: 422, message: 'O nome deve ser uma string' },
    };
  }

  return {};
};

// const isNameValid = (name) => {
//   if (name.length < 5 && typeof name !== 'string') return false;

//   return true;
// };

const isQuantityValid = (quantity) => {
  if (quantity < 0) {
    return {
      err:
        { code: 422, message: 'A quantidade dever maior ou igual a 0' },
    };
  }
  if (typeof quantity !== 'number') {
    return {
      err:
        { code: 422, message: 'A quantidade deve ser um número' },
    };
  }

  return {};
};

const isQuantityValidTwo = (quantity) => {
  if (quantity === 0) {
    return {
      err:
        { code: 422, message: 'A quantidade dever maior ou igual a 1' },
    };
  }
  if (typeof quantity === 'string') {
    return {
      err:
        { code: 422, message: 'A quantidade deve ser um número' },
    };
  }

  return {};
};

module.exports = {
  isNameValid,
  isQuantityValid,
  isQuantityValidTwo,
};
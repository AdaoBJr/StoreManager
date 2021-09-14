const quantityValidator = (itens) => {
const test = itens.some((element) => element.quantity <= 0 || typeof element.quantity !== 'number');
    if (test) {
      return {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
       }, 
       code: 422 };
    }
    return false;
  };

const salesValidator = (itens) => {
  const invalidQt = quantityValidator(itens);

  if (invalidQt) {
    return invalidQt;
  }

  return false;
};

module.exports = {
 salesValidator,
};
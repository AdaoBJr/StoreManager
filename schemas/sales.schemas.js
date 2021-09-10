const ID_SIZE = 24;

const isIdValid = (id) => {
  if (id.length !== ID_SIZE) {
    return {
      code: 404,
      err: {
        code: 'not_found', message: 'Sale not found',
      },
    };
  }
  return true;
};
const isQuantityValid = (sales) => {
  let erro = 0;
  sales.forEach((sale) => {
    // https://stackoverflow.com/questions/51593287/javascript-foreach-manage-exceptions
    if (sale.quantity < 1 || typeof sale.quantity !== 'number') {
      erro += 1;
    }
  });
  if (erro > 0) {
    return {
      code: 422,
      err: {
        code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return true;
};

module.exports = { isQuantityValid, isIdValid };

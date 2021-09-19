const isQuantityValid = (sales) => {
  let erro = 0;
  sales.forEach((sale) => {
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

module.exports = { isQuantityValid };

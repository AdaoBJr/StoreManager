const ZERO = 0;

module.exports = (req, _res, next) => {
  const sales = req.body;

  const invalidSales = sales.find(
    (sale) => sale.quantity < ZERO
    || sale.quantity === ZERO
    || typeof sale.quantity === 'string',
  );

  if (invalidSales) {
    return next({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      statusCode: 422,
    });
  }

  return next();
};

const error = (code, message) => ({
  isError: true,
  code,
  message,
});

const errorSales = (code, message) => ({
  isError: 'errorSales',
  code,
  message,
});

module.exports = {
  errorBusines: (message) => error('invalid_data', message),
  errorSalesId: (message) => errorSales('not_found', message),
};

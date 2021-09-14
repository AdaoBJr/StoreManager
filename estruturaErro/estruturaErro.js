const error = (code, message) => ({
  isError: true,
  code,
  message,
});

module.exports = { errorBusines: (message) => error('invalid_data', message) };

const messageError = (code, message) => ({
  isError: true,
  code,
  message,
});

module.exports = {
  errorBusines: (message) => messageError('invalid_data', message),
};
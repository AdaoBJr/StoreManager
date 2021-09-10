const error = (code, message) => ({
  isError: true,
  code,
  message
});

module.exports = {
  errorInternal: (message) => error('invalid_data', message),
  errorBusiness: (message) => error('invalid_data', message),
  errorNotFound: (message) => error('not_found', message)
};

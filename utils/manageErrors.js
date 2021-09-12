const error = (statusCode, message) => ({
  isError: true,
  code: +statusCode,
  message,
});

module.exports = {
  conflict: (message) => error('422', message),
  unauthorized: (message) => error('401', message),
  notFound: (message) => error('404', message),
};
// Esta parte do código foi desenvolvida pelo meu colega Henrique Clementino.

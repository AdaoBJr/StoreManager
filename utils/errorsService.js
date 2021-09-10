const error = (statusCode, message) => ({
  isError: true,
  code: typeof statusCode === 'string' ? statusCode : +statusCode,
  message,
});

module.exports = {
  conflict: (message) => error('409', message),
  unauthorized: (message) => error('401', message),
  notFound: (message) => error('not_found', message),
  badRequest: (message) => error('400', message),
  invalidData: (message) => error('invalid_data', message),
  stockProblem: (message) => error('stock_problem', message),
};

const error = (statusCode, message) => {
  const code = typeof statusCode === 'string' ? statusCode : Number(statusCode);

  return {
    code,
    message,
    isError: true,
  };
};

module.exports = {
  notFound: (message) => error('not_found', message),
  stockProblem: (message) => error('stock_problem', message),
  invalidData: (message) => error('invalid_data', message),
};

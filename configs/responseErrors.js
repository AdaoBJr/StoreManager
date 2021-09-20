const error = (statusCode, message) => {
  const code = typeof statusCode === 'string' ? statusCode : Number(statusCode);

  return {
    code,
    message,
    isError: true,
  };
};

module.exports = {
  conflict: (message) => error('409', message),
  notFound: (message) => error('not_found', message),
  badRequest: (message) => error('400', message),
  unauthorized: (message) => error('401', message),
  invalidData: (message) => error('invalid_data', message),
};

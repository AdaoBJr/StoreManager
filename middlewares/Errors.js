const errorCodeNames = {
  invalidData: 'invalid_data',
  notFound: 'not_found',
  alreadyExists: 'already exists',
};

module.exports = (error, _request, response, _next) => {
  if (error.isJoi) {
    return response
      .status(422)
      .json({ err: {
        code: 'invalid_data',
        message: error.details[0].message.replace(/"/g, '"'),
      } });
  }

  const statusByErrorCode = {
    [errorCodeNames.invalidData]: 422,
    [errorCodeNames.notFound]: 404,
    [errorCodeNames.alreadyExists]: 409,
  };

  const status = statusByErrorCode[error.code] || 500;

  return response.status(status).json({ err: { code: error.code, message: error.message } });
};

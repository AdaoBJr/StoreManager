module.exports = (error, _request, response, _next) => {
  if (error.isJoi) {
    return response
      .status(400)
      .json({ error: { message: error.details[0].message.replace(/"/g, '\'') } });
  }

  const statusByErrorCode = {
    notFound: 404,
    alreadyExists: 409,
  };

  const status = statusByErrorCode[error.code] || 500;

  return response.status(status).json({ error: { message: error.message } });
};

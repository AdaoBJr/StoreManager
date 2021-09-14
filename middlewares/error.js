const INVALID_DATA_CODE = 422;
const INTERNAL_SERVER_ERROR_CODE = 500;

const checkErrorCode = (code) => {
  switch (code) {
    case 'not_found':
    case 'stock_problem':
      return 404;

    case 'invalid_data':
      return 422;

    default:
      return false;
  }
};

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(INVALID_DATA_CODE).json({
      err: { code: 'invalid_data', message: err.details[0].message },
    });
  }

  // Verificamos se esse é um erro de domínio
  if (err.code) {
    const status = checkErrorCode(err.code) || INTERNAL_SERVER_ERROR_CODE;

    return res.status(status).json({ err });
  }

  res
    .status(INTERNAL_SERVER_ERROR_CODE)
    .json({ err: { code: 'internal', message: 'Internal server error' } });
};

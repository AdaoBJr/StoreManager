const { INTERNAL_ERROR, INVALID_DATE, NOT_FOUND } = require('../utils/statusCode');

const errJoi = (err) => ({
  err: {
    code: 'invalid_data',
    message: err.details[0].message,
  },
});

const errService = (err) => ({
  err: {
    code: err.code,
    message: err.message,
  },
});

const errServer = () => ({
  err: {
    code: INTERNAL_ERROR,
    message: 'INTERNAL ERROR',
  },
});

module.exports = (err, req, res, _next) => {
  const code404 = ['not_found', 'stock_problem'].some((error) => error === err.code);
  const statusCode = code404 ? NOT_FOUND : INVALID_DATE;
  if (err.isJoi) return res.status(INVALID_DATE).json(errJoi(err));
  if (err.isError) return res.status(statusCode).json(errService(err));
  res.status(INTERNAL_ERROR).json(errServer());
};

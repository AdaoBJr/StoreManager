const { INTERNAL_ERROR, INVALID_DATE, NOT_FOUND } = require('../configs/statusCodes');

const errJoi = (err) => ({
  err: {
    code: 'invalid_data',
    message: err.details[0].message,
  },
});

const errServer = () => ({
  err: {
    code: INTERNAL_ERROR,
    message: 'INTERNAL ERROR',
  },
});

const errService = (err) => ({
  err: {
    code: err.code,
    message: err.message,
  },
});

module.exports = (err, _req, res, _next) => {
  const isInvalid = ['not_found', 'stock_problem'].some((status) => status === err.code);

  if (err.isJoi) return res.status(INVALID_DATE).json(errJoi(err));
  if (err.isError) {
    return res.status(isInvalid ? NOT_FOUND : INVALID_DATE).json(errService(err));
  }
  res.status(INTERNAL_ERROR).json(errServer());
};

const STATUS_CODE_ANAUTORAZED = 422;
const STATUS_CODE_NOT_FOUND = 404;

const errorMiddleProducts = (err, _req, res, _next) => {
  if (err.isError) {
    if (err.message === 'Sale not found'
    || err.message === 'Such amount is not permitted to sell') {
      const errorFoud = { code: err.code, message: err.message };
      return res.status(STATUS_CODE_NOT_FOUND).json({ err: errorFoud });
    }
    
    const errorBussines = { code: err.code, message: err.message };
    return res.status(STATUS_CODE_ANAUTORAZED).json({ err: errorBussines });
  }

  const newError = { code: 'invalid_data', message: err.details[0].message };
  return res.status(STATUS_CODE_ANAUTORAZED).json({ err: newError });
};

module.exports = { errorMiddleProducts };

const STATUS_CODE_ANAUTORAZED = 422;
// const STATUS_CODE_NOT_FOUND = 404;

const errorMiddleProducts = (err, _req, res, _next) => {
  console.log(err);
  if (err.isError) {
    const errorBussines = {
      code: err.code,
      message: err.message,
    };

    return res.status(STATUS_CODE_ANAUTORAZED).json({ err: errorBussines });
  }
  
  if (err.isJoi) {
    const newError = {
      code: 'invalid_data',
      message: err.details[0].message,
    };

    return res.status(STATUS_CODE_ANAUTORAZED).json({ err: newError });
  }
};

module.exports = { errorMiddleProducts };

const STATUS_CODE_ANAUTORAZED = 422;
// const STATUS_CODE_NOT_FOUND = 404;

const errorMiddleProducts = (err, _req, res, _next) => {
  if(err.isError) {
    return res.status(STATUS_CODE_ANAUTORAZED).json(
      {
        code: err.code,
        message: err.message
      }
    );
  }
  
  if(err) {
    const newError = {
      code: 'invalid_date',
      message: err.details[0].message
    };

    return res.status(STATUS_CODE_ANAUTORAZED).json(newError);
  }

};

module.exports = {errorMiddleProducts};

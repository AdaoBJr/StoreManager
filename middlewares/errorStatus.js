module.exports = (error, _req, res, _next) => {
  console.log(error);
  if (error.isError) {
   return res.status(422).json({
      err: {
        code: error.code,
        message: error.message,
      },
    });
  }

  if (error) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: error.details[0].message,
      },
    });
  }
};
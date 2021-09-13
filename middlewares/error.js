module.exports = (err, req, res, _next) => {
  const message = err.isJoi ? err.details[0].message : err.message;
  
  return res.status(422).json({
    err: {
      message,
      code: 'invalid_data',
    },
  });
};
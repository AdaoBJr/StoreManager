module.exports = (err, _req, res, _next) => {
  const message = err.isJoi ? err.details[0].message : err.message;
  const status = err.status ? err.status : 422;
  return res.status(status).json({
    err: {
      message,
      code: 'invalid_data',
    },
  });
};
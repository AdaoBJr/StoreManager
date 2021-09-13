module.exports = (error, _req, res, _next) => {
  const { err, statusCode } = error;

  return res.status(statusCode).json({ err });
};

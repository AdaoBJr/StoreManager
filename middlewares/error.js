module.exports = (err, _req, res, _next) => {
  const { code, message, status } = err;
  res.status(status).json({ err: { code, message } });
};
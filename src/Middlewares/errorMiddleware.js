module.exports = (err, _req, res, _next) => {
  if (err.code && err.message) {
    return res.status(err.status).json({ err: { code: err.code, message: err.message } });
  }

  return res.status(500).json({ message: err.message });
};

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(422)
      .json({
        err: { code: 'INVALID_DATA', message: err.details[0].message },
      });
  }

  const statusByErorCode = {
    INVALID_DATA: 422,
  };

  const status = statusByErorCode[err.code] || 500;
  const code = err.code.toLowerCase();

  res.status(status).json({ err: { code, message: err.message } });
};

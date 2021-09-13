module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(422)
      .json({
        err: { code: 'invalid_data', message: err.details[0].message },
      });
  }

  const statusByErorCode = {
    INVALID_DATA: 422,
  };

  const status = statusByErorCode[err.code] || 500;
  const code = err.code.toLowerCase();

  return res.status(status).json({ err: { code, message: err.message } });
};

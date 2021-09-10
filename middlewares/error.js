module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(422)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }
};
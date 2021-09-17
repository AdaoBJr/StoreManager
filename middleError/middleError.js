module.exports = (err, _req, res, _next) => {
  if (err.isError) {
    console.log('isErro');
    return res.status(422).json({ err: { code: err.code, message: err.message } });
  }
  return res.status(422).json({ err: { code: 'invalid_data', message: err.message } });
};

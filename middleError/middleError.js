module.exports = (err, _req, res, _next) => {
  console.log(err);
  if (err.isError === 'errorSales') {
    return res.status(404).json({ err: { code: err.code, message: err.message } });
  }
  if (err.isError) {
    return res.status(422).json({ err: { code: err.code, message: err.message } });
  }
  return res.status(422).json({ err: { code: 'invalid_data', message: err.message } });
};

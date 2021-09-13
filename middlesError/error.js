module.exports = (err, req, res, next) => {
  if (err.isError) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
  next();
};

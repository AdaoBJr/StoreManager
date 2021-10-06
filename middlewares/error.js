module.exports = (err, req, res, _next) => {
    res.status(err.number).json({ err: err.error });
  }; 
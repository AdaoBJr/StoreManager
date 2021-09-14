module.exports = (err, req, res, _next) => {
  if (err.code) {
    return res.status(err.code).json(err.message);
  }
  return res.status(500).json('Algo deu ruim :(');
};
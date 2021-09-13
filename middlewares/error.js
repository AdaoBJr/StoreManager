module.exports = (err, req, res) => {
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  const status = err.status || 500;
  
  res.status(status).json({ message: err.message });
};
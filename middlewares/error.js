module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    // Status 400 - Validation error
    return res.status(400).json({ message: err.details[0].message });
  }

  const status = err.status || 500;
  
  return res.status(status).json({ message: err.message });
};
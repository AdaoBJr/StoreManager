const nextErrors = ((err, _req, res, next) => {
  if (err.status) return res.status(err.status).json({ ...err.message });

  if (!err.message) return next({ message: 'no message' });
  
  const defaultStatus = 500;
  
  return res.status(defaultStatus).json({
    message: `Internal server error: ${err.message}`,
  });
});

module.exports = nextErrors;

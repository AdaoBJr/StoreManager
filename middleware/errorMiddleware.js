const errorBuilder = ({ status, code, message: msg }) => {
  if (!status || !code || !msg) return;    
  return ({ status,
    message: {
      err: {
        code,
        message: msg,
      },
    } });
  };

const errorMiddleware = (err, _req, res, _next) => {
  const { status, message } = err;
  if (message.err && status) {
    return res.status(err.status).json(err.message);
  }
  return res.status(500).json({ message: err.message });
};

module.exports = {
  errorMiddleware,
  errorBuilder,
};
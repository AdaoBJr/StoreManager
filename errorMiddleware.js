const { dictionary } = require('./src/helpers/dictionary');

const errorMiddleware = (err, _req, res, _next) => {
  const { internalServerError } = dictionary().status;

  if (err.status && err.code) {
    return res.status(err.status).json({ err: { code: err.code, message: err.message } });
  }

  return res.status(internalServerError).json({ message: err.message });
};

module.exports = { errorMiddleware };

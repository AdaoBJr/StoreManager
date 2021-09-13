const errors = require('../utils/errorCodes');

module.exports = (err, _req, res, _next) => {
  // console.log(errors[err.statusCode]);
  if (err.statusCode) {
    const { code, message, status } = errors[err.statusCode];
    return res.status(status).json({ err: { code, message } });
  }
  return res.status(500).json({ message: err.message });
};

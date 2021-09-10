const errorHandler = require('../utils/errorHandler');

module.exports.errorMiddleware = (err, _req, res, _next) => {
  errorHandler(err, res);
};

process.on('unhandledRejection', (reason) => {
  console.error('There was an unhandled rejection', reason);
  errorHandler(reason);
});

process.on('uncaughtException', (error) => {
  console.error('There was an uncaught error', error);
  errorHandler(error);
});

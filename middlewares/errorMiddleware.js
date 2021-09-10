const { unprocessableEntity, notFound } = require('../utils/statusCodes');

const errorMiddleware = (error, req, res, next) => {
  if (error.isJoi) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: error.message,
      },
    });
  }

  if (error.isRepeatedName) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: error.message,
      },
    });
  }

next(error);
};

const errorMiddleware2 = (error, req, res, next) => {
  if (error.isInvalidId) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  if (error.isSaleInvalid) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: error.message,
      },
    });
  }
  next(error);
};

const errorMiddleware3 = (error, req, res, next) => {
  if (error.isSaleIdInvalid) {
    return res.status(notFound).json({
      err: {
        code: 'not_found',
        message: error.message,
      },
    });
  }

  if (error.isSaleIdFormatInvalid) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: error.message,
      },
    });
  }
  next(error);
};

module.exports = {
  errorMiddleware,
  errorMiddleware2,
  errorMiddleware3,
};

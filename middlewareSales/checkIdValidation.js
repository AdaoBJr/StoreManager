const sales = require('../models/sales');

const isValidIdLength = (req, res, next) => {
  const { id } = req.params;
  if (!id || id.length !== 24) {
  return res.status(404).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
      },
    });
  }
  next();
};

const isIdExists = async (req, res, next) => {
  const { id } = req.params;
  if (id.length === 24) {
    const checkId = await sales.findSale(id);
    if (!checkId) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
        },
      });
    }
  }
    next();
};

const isValidIdLengthDelete = (req, res, next) => {
  const { id } = req.params;
  if (id.length < 24) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
        },
      });
}
  next();
};

const isIdExistsAfterDelete = async (req, res, next) => {
  const { id } = req.params;
  if (id.length === 24) {
    const checkId = await sales.findSale(id);
    if (!checkId) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
        } });
}
  }
    next();
};
module.exports = { isValidIdLength, isIdExists, isValidIdLengthDelete, isIdExistsAfterDelete };

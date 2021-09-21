const { findOne } = require('../models/productsModel');

const { error } = require('../middlewares/errorMessage');

const {
  success,
  invalid,
} = error.codeStatus;
const {
  invalidID,
  invalidData,
} = error.errorMessage;

const minID = 24;

const firstReturn = {
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: invalidID,
    },
  },
};
const secondReturn = {
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: invalidID,
    },
  },
};

const findProduct = async (id) => {
  if (id.length < minID) { return firstReturn; }
  const result = await findOne(id, null);
  if (!result) { return secondReturn; }
  return ({
    statusCode: success,
    infos: result,
  });
};

module.exports = findProduct;

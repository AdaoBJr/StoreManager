const {
  deleteOne,
  findOne,
} = require('../models/productsModel');

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

const deleteProduct = async (id) => {
  if (id.length < minID) { return firstReturn; }
  const product = await findOne(id);
  if (!product) { return secondReturn; }
  await deleteOne(id);
  return {
    statusCode: success,
    infos: product,
  };
};

module.exports = deleteProduct;

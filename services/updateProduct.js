const {
  findOne,
  updateOne,
} = require('../models/productsModel');

const { error } = require('../middlewares/errorMessage');

const {
  invalid,
  success,
} = error.codeStatus;
const {
  shortName,
  invalidQuantityValue,
  invalidQuantityType,
  invalidData,
  invalidID,
} = error.errorMessage;

const nameMinLength = 5;
const minQuantity = 1;

const firstReturn = { 
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: shortName,
    },
  },
};
const secondReturn = { 
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: invalidQuantityValue,
    },
  },
};
const thirdReturn = { 
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: invalidQuantityType,
    },
  },
};
const fourthReturn = { 
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: invalidID,
    },
  },
};

const updateProduct = async (id, name, quantity) => {
  if (name.length < nameMinLength) { return firstReturn; }
  if (quantity < minQuantity) { return secondReturn; }
  if (typeof quantity !== 'number') { return thirdReturn; }
  const product = await findOne(id, null);
  if (!product) { return fourthReturn; }
  const result = await updateOne(id, name, quantity);
  return {
    statusCode: success,
    infos: result,
  };
};

module.exports = updateProduct;

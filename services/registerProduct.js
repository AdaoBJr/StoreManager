const {
  findOne,
  register,
} = require('../models/productsModel');

const { error } = require('../middlewares/errorMessage');

const {
  created,
  invalid,
} = error.codeStatus;
const {
  shortName,
  invalidQuantityValue,
  invalidQuantityType,
  invalidData,
  duplicatedProduct,
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
const forthReturn = { 
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: duplicatedProduct,
    },
  },
};

const registerProduct = async (name, quantity) => {
  if (name.length < nameMinLength) { return firstReturn; }
  if (quantity < minQuantity) { return secondReturn; }
  if (typeof quantity !== 'number') { return thirdReturn; }
  const product = await findOne(null, name);
  if (product) { return forthReturn; }
  const result = await register(name, quantity);
  return {
    statusCode: created,
    infos: result,
  };
};

module.exports = registerProduct;

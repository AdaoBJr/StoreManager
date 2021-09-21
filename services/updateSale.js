const {
  findOne,
  updateOne,
} = require('../models/salesModel');

const { error } = require('../middlewares/errorMessage');

const {
  invalid,
  success,
} = error.codeStatus;
const {
  invalidData,
  saleInvalid,
} = error.errorMessage;

const minQuantity = 1;

const firstReturn = {
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: saleInvalid,
    },
  },
};
const secondReturn = { 
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: saleInvalid,
    },
  },
};

const updateSale = async (id, itens) => {
  let isValid = true;
  itens.forEach((product) => {
    const { quantity } = product;
    if (quantity < minQuantity || typeof quantity !== 'number') {
      isValid = false;
      return isValid;
    }
  });
  if (!isValid) { return firstReturn; }
  const sale = await findOne(id);
  if (!sale) { return secondReturn; }
  const result = await updateOne(id, itens);
  return {
    statusCode: success,
    infos: result,
  };
};

module.exports = updateSale;

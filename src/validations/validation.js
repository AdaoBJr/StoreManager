const productsModel = require('../models/productsModel');
const { dictionary } = require('../helpers/dictionary');

const validateNameLength = (name) => {
  const { nameLengthValidation } = dictionary().messages;
  const { unprocessableEntity } = dictionary().status;
  const { invalidData } = dictionary().code;

  if (name.length < 5) {
    return {
      err: { message: nameLengthValidation, code: invalidData, status: unprocessableEntity },
    };
 }
};

const checkDoubleName = async (name) => {
  const { unprocessableEntity } = dictionary().status;
  const { alreadyExists } = dictionary().messages;
  const { invalidData } = dictionary().code;

  const checkedName = await productsModel.checkName(name);

  if (checkedName) {
    return { err: { message: alreadyExists, code: invalidData, status: unprocessableEntity } };
  }
};

const validateQuantityType = (quantity) => {
  const { quantityTypeValidation } = dictionary().messages;
  const { unprocessableEntity } = dictionary().status;
  const { invalidData } = dictionary().code;

    if (typeof quantity !== 'number') {
      return {
        err: { message: quantityTypeValidation, code: invalidData, status: unprocessableEntity },
      };
    }
};

const validateQuantityAmount = (quantity) => {
  const { unprocessableEntity } = dictionary().status;
  const { quantityAmountValidation } = dictionary().messages;
  const { invalidData } = dictionary().code;

  if (quantity <= 0) {
    return {
      err: { message: quantityAmountValidation, code: invalidData, status: unprocessableEntity },
    };
  }
};

const validateQuantityTypeAndAmount = (quantity) => {
  const { unprocessableEntity } = dictionary().status;
  const { quantityTypeAndAmountValidation } = dictionary().messages;
  const { invalidData } = dictionary().code;

  if (typeof quantity !== 'number' || quantity <= 0) {
    return {
      err: {
        message: quantityTypeAndAmountValidation, code: invalidData, status: unprocessableEntity,
      },
    };
  }
};

module.exports = {
  validateNameLength,
  validateQuantityAmount,
  validateQuantityType,
  checkDoubleName,
  validateQuantityTypeAndAmount };

const Sales = require('../models/Sales');

const validations = require('../schemas/salesValidations');

const registerNewSales = async (sales) => {
  const validateProductIdOfSales = validations.validateProductIdOfSales(sales);
  if (validateProductIdOfSales.message) {
    return {
      code: validateProductIdOfSales.code,
      message: validateProductIdOfSales.message,
    };
  }

  const validateQtyOfSales = validations.validateQuantity(sales);
  if (validateQtyOfSales.message) {
    return {
      code: validateQtyOfSales.code,
      message: validateQtyOfSales.message,
    };
  }

  const addedSales = await Sales.registerNewSales(sales);
  if (addedSales.message) return { message: addedSales.message };

  return addedSales;
};

module.exports = {
  registerNewSales,
};

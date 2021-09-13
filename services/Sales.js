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

const getAllSales = async () => {
  const allSales = await Sales.getAllSales();
  if (allSales.message) return { message: allSales.message };

  return {
    sales: allSales,
  };
};

const getSaleById = async (id) => {
  const validateIdMongo = validations.validateIdMongo(id);
  if (validateIdMongo.message) {
    return {
      code: validateIdMongo.code,
      message: validateIdMongo.message,
    };
  }

  const validateIfSaleExists = validations.validateIfSaleExists(id);
  if (validateIfSaleExists.message) {
    return {
      code: validateIfSaleExists.code,
      message: validateIfSaleExists.message,
    };
  }
  
  const sale = await Sales.getSaleById(id);
  if (sale.message) return { message: sale.message };

  return sale;
};

module.exports = {
  registerNewSales,
  getAllSales,
  getSaleById,
};

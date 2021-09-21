const Sales = require('../models/Sales');
const { isSalesQuantityValid } = require('../schema/validations');

const createSale = async (itensSold) => {
  const validateQuantity = isSalesQuantityValid(itensSold);
  if (validateQuantity.err) return validateQuantity;

  const newSale = await Sales.createSale(itensSold);

  return newSale;
};

const getAllSales = async () => Sales.getAllSales();

const findSaleById = async (id) => {
  const sale = await Sales.findSaleById(id);

  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return findSaleById(sale);
};

module.exports = {
  createSale,
  findSaleById,
  getAllSales,

};
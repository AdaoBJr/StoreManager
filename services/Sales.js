const Sales = require('../models/Sales');
const { isSalesQuantityValid,
  isQuantityValid,
  isQuantityValidTwo } = require('../schema/validations');

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

const updateSale = async (id, itemToUpdate) => {
  const { quantity } = itemToUpdate[0];
  const validateQuantity = isQuantityValid(quantity);
  if (validateQuantity.err) return validateQuantity;

  const valivalidateQuantityTwo = isQuantityValidTwo(quantity);
  if (valivalidateQuantityTwo.err) return valivalidateQuantityTwo;

  return Sales.updateSale(id, itemToUpdate);
};

const deleteSale = async (id) => {
  const deletedSale = await Sales.deleteSale(id);

  if (!deletedSale) return false;

  return deletedSale;
};

module.exports = {
  createSale,
  findSaleById,
  getAllSales,
  updateSale,
  deleteSale,
};
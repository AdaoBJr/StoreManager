const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const createSales = async (sales) => {
  const exists = await Promise.all(
    sales.map((sale) => {
      const ZERO = 0;

      if (sale.quantity <= ZERO) {
        throw new Error();
      }
      if (typeof sale.quantity === 'string') {
        throw new Error();
      }

      return productsModel.getOne(sale.productId);
    }),
  );

  if (!exists) {
    throw new Error();
  }

  return salesModel.createSales(sales);
};

const getSales = async (sales) => salesModel.getAll(sales);

const getSalesById = async (id) => {
  if (id) {
    return salesModel.getOne(id);
  }
  throw new Error();
};

const updateSale = async (sale, id) => {
  const ZERO = 0;

  if (sale.quantity <= ZERO) {
    throw new Error();
  }
  if (typeof sale.quantity === 'string') {
    throw new Error();
  }

  return salesModel.updateSaleById(sale, id);
};

const deleteSale = async (id) => salesModel.deleteSaleById(id);

module.exports = { createSales, getSales, getSalesById, updateSale, deleteSale };

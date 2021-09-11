const {
  includeSales,
  getAllSales,
  findById,
  updateSale,
  removeSale,
} = require('../models/salesModel');

const { updateStock } = require('./productsService');

const getAll = async () => getAllSales();

const getById = async (id) => findById(id);

const update = async (id, sale) => updateSale(id, sale);

const include = async (sales) => {
  sales.forEach(({ productId, quantity }) => {
    updateStock(productId, -quantity);    
  });
 return includeSales(sales);
};

const remove = async (id) => {
  const { itensSold } = await findById(id);
  itensSold.forEach(({ productId, quantity }) => {
    updateStock(productId, quantity);    
  });
  return removeSale(id); 
};

module.exports = {
  include,
  getAll,
  getById,
  update,
  remove,
};
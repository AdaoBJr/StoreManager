const sale = require('../models/sales');
// const Error = require('../utils/manageErrors');

const create = async (itensSold) => sale.createSale(itensSold);

const getSales = async () => sale.getAllSales();
// const updateById = async (id, name, quantity) => product.updateProduct(id, name, quantity);
// const deleteProductById = async (id) => product.deleteProduct(id);

module.exports = {
  create,
  getSales,
  getSaleById: sale.getSaleById,
  // updateById,
  // deleteProductById,
};

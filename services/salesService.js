const {
  includeSales,
  getAllSales,
  findById,
  updateSale,
  removeSale,
} = require('../models/salesModel');

const {
  quantityValidations,
  idValidation,
  existenceValidation,
  stockVerification,
} = require('../validations/salesValidations');

const { updateStock } = require('./productsService');

const getAll = async () => getAllSales();

const getById = async (id, method) => {
  const idValid = idValidation(id, method);
  if (idValid.err) return idValid;
  
  const saleExists = await existenceValidation(id, method);
  if (saleExists.err) return saleExists;
    
  return findById(id);
};

const update = async (id, sale) => {
  const quantityValid = quantityValidations(sale);
  if (quantityValid.err) return quantityValid;

  return updateSale(id, sale);
};

const include = async (sales) => {
  const quantityValid = quantityValidations(sales);
  if (quantityValid.err) return quantityValid;

  const stockValid = await stockVerification(sales);
  if (stockValid.stockError) return stockValid;
  sales.forEach(({ productId, quantity }) => {
    updateStock(productId, -quantity);    
  });
 return includeSales(sales);
};

const remove = async (id, method) => {
  const idValid = idValidation(id, method);
  if (idValid.err) return idValid;

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
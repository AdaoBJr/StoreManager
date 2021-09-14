const CustomError = require('../helpers/CustomError');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModels');

const authoriseSale = (itensSold) => {
  const promiseExistProducts = itensSold.map(async ({ productId, quantity }) => {
    const existProduct = await productsModel.findById({ id: productId });
    
    if (!existProduct) return false;
    if (Number(existProduct.quantity) < Number(quantity)) return false;
    return true;
  });

  return promiseExistProducts;
};

const create = async (itensSold) => {
  const promiseExistProducts = authoriseSale(itensSold);

  const productsSales = Promise.all(promiseExistProducts).then(async (values) => {
    const isAuthoriseSale = values.every((e) => e);

    if (isAuthoriseSale) {
      const response = await salesModel.create(itensSold);
      
      itensSold.forEach(async ({ productId, quantity }) => {
        await productsModel.decrementeQuantityProduct(productId, quantity);
      });

      return response;
    }
     throw new CustomError('stock_problem', 'Such amount is not permitted to sell', 404);
  });

  return productsSales;
};

const findAll = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const findById = async ({ id }) => {
  const sale = await salesModel.findById({ id });

  return sale;
};

const updateById = async ({ saleId, itensSold }) => {
  const response = await salesModel.updateById({ saleId, itensSold });
  
  return response;
};

const remove = async ({ id }) => {
  const sale = await salesModel.findById({ id });

  if (!sale) {
    throw new CustomError('not_found', 'Sale not found', 404);
  }

  await salesModel.remove({ id });
  sale.itensSold.forEach(async ({ productId, quantity }) => {
    await productsModel.incrementeQuantityProduct(productId, quantity);
  });

  return sale;
};

module.exports = { create, findAll, findById, updateById, remove };
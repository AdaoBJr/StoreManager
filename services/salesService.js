const SalesModels = require('../models/salesModels');

const verifyQuantity = (body) => {
 const condiction = body.some((item) => typeof item.quantity !== 'number' || item.quantity <= 0);
 if (condiction) {
   return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    }; 
 }
return false;
};

const createSale = async (body) => {
  const x = verifyQuantity(body);
  if (x) return x;
  const sale = await SalesModels.createSale(body);
  return sale;
};

const getSaleById = async (id) => {
  const getSaleId = await SalesModels.getSaleById(id);
  if (!getSaleId) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return getSaleId;
};

const getSales = async () => {
  const getSale = await SalesModels.getSales();
  return getSale;
};

const updateSaleId = async (id, body) => {
  const x = verifyQuantity(body);
  if (x) return x;
  const updateSale = await SalesModels.updateSaleId(id, body);
  return updateSale;
};

const deleteSaleId = async (id) => {
  const deleteSale = await SalesModels.deleteSaleId(id);
  if (!deleteSale) {
    return {
       err: {
         code: 'invalid_data',
         message: 'Wrong sale ID format',
       },
     }; 
  }
  return deleteSale;
};

module.exports = {
  createSale,
  getSaleById,
  getSales,
  updateSaleId,
  deleteSaleId,
};
const SalesModel = require('../models/SalesModel');
const ProductModel = require('../models/ProductModel');

const isQuantValid = (arr) => {
  const arrValid = arr.map(({ quantity }) => {
    if (typeof quantity !== 'number' || quantity <= 0) return false;

    return true;
  });

  return arrValid;
};

const quantInvalidErr = {
  err: { 
    message: 'Wrong product ID or invalid quantity',
    code: 'invalid_data',
  },
  status: 422,
};

const idNotExistsErr = {
  err: { 
    message: 'Sale not found',
    code: 'not_found',
  },
};

const wrongIdErr = {
  err: { 
    message: 'Wrong sale ID format',
    code: 'invalid_data',
  },
};

const quantProdErr = {
  err: { 
    message: 'Such amount is not permitted to sell',
    code: 'stock_problem',
  },
  status: 404,
};

const getAll = async () => {
  const getAllSales = await SalesModel.getAll();

  return getAllSales;
};

const findById = async (id) => {
  const getSalesId = await SalesModel.findById(id);

  if (!getSalesId) return idNotExistsErr;

  return getSalesId;
};

const saleIsBiggerThanProd = (prodId, saleQuant, prodQuant) => {
  if (saleQuant > prodQuant) {
    return true;
  }

  ProductModel.updateProductBySale(prodId, prodQuant, saleQuant);
  return false;
};

const create = async (arr) => {
  const salesQuantValid = isQuantValid(arr);
  const filterSalesValid = salesQuantValid.filter((sales) => sales === false);

  if (filterSalesValid.length > 0) return quantInvalidErr;

  const listProducts = await ProductModel.getAll();

  let respBool;
  arr.forEach((sale) => listProducts.map(({ _id, quantity }) => {
    if (_id.toString() === sale.productId) {
      respBool = saleIsBiggerThanProd(sale.productId, sale.quantity, quantity);
      return respBool;
    }
    return null;
  }));

  if (respBool) { 
    return quantProdErr;
  }

  const salesCreated = await SalesModel.create(arr);

  return salesCreated;
};

const update = async (id, arr) => {
  const salesQuantValid = isQuantValid(arr);

  const filterSalesValid = salesQuantValid.filter((sales) => sales === false);

  if (filterSalesValid.length > 0) {
    return quantInvalidErr;
  }
  const updateSales = await SalesModel.update(id, arr);

  return updateSales;
};

const exclude = async (id) => {
  const deletedSales = await SalesModel.exclude(id);

  if (!deletedSales) return wrongIdErr;

  return deletedSales;
};

// const updateProductBySale = async (arr) => {
//   const listProducts = await ProductModel.getAll();
//   // console.log(listProducts);

//   arr.map((sale) => listProducts.map(({ _id, quantity }) => {
//       if (_id.toString() === sale.productId) {
//         ProductModel.updateProductBySale2(sale.productId, quantity, sale.quantity);
//       }

//       return null;
//     }));
// };

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
  // updateProductBySale,
};
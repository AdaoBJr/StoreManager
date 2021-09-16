const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');

// validações sales
const validQuantity = (sale) => {
const num = 0;
  const isValidMinNumber = sale.every((item) =>
    item.quantity > num && typeof item.quantity === 'number');

  return isValidMinNumber;
};

const incrementSales = async ({ itensSold }) => {
  if (!itensSold) return null;
  const result = itensSold.map(({ productId, quantity }) =>
   ProductsModel.incrementProducts(productId, quantity));
   const promisesResolv = await Promise.all(result);
   return promisesResolv.every((promises) => promises);
};

const decrementaSales = async (sale) => {
  if (!sale) return null;
  const result = sale.map(({ productId, quantity }) =>
  ProductsModel.decrementProducts(productId, quantity));
  const promisesResolv = await Promise.all(result);
   return promisesResolv.every((promises) => promises);
};

const validmap = async (sale) => {
  const getQuaProdDB = await sale.map(async ({ productId, quantity }) => {
    const cadaitem = await ProductsModel.getProductsById(productId);
    const Quantity = cadaitem.quantity - quantity;

    return Quantity;
  });
  const promisses = await Promise.all(getQuaProdDB).then((result) => result);

    return promisses.some((item) => item < 0);
};

// const validQuanProdSales = async () => {
//   const id = sale[0].productId;
//   const bodyQuanSale = sale[0].quantity;
//   const result = await ProductsModel.getProductsById(id);
//   const quantBD = result.quantity;

//   return quantBD > bodyQuanSale;
// };

// função

const addSale = async (sale) => {
  const valid = validQuantity(sale);
    if (!valid) {
      return {
      status: 422,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
      };
    }
    const isValidQantity = await validmap(sale);
    if (isValidQantity) {
      return {
        status: 404,
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
        };
    }
    decrementaSales(sale);
    return SalesModel.addSale(sale);
};

const getSale = async () => {
  const result = await SalesModel.getSale();
  return result;
};

const getSaleById = async (id) => {
  const result = await SalesModel.getSaleById(id);
  if (!result) {
    return {
    status: 404,
    code: 'not_found',
    message: 'Sale not found',
    };
  }
  return result;
};

const putSales = async (id, sale) => {
  const valid = validQuantity(sale);
    if (!valid) {
      return {
      status: 422,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
      };
    }
    return SalesModel.putSales(id, sale);
};

const deleteSales = async (id) => {
  const sale = await SalesModel.deleteSales(id);
  if (!sale) {
    return false;
  }
  // console.log(`inc ${result}`);
  incrementSales(sale);
  return sale;
};

module.exports = {
  addSale,
  getSale,
  getSaleById,
  putSales,
  deleteSales,
};
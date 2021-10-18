const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { dictionary } = require('../helpers/dictionary');
const { validateQuantityTypeAndAmount } = require('../validations/validation');

const updateProductQuantity = (sale, operation) => {
  sale.forEach(async (eachSale) => {
    let quantity;
    const { productId, quantity: quantitySale } = eachSale;
    const { name, quantity: quantityProduct } = await productsModel.getProductById(productId);
    if (operation === 'subtraction') quantity = quantityProduct - quantitySale;
    else if (operation === 'sum') quantity = quantityProduct + quantitySale;
    await productsModel.updateProductById(productId, name, quantity);
  });
};

const addSale = async (saleArray) => {
  const verifiedSales = saleArray.map((sale) => {
    if (validateQuantityTypeAndAmount(sale.quantity)) {
      return validateQuantityTypeAndAmount(sale.quantity);
    }
    return null;
  });

  const errorOnAdd = verifiedSales.find((b) => b);

  if (errorOnAdd) return errorOnAdd;

  const newSale = await salesModel.addSale(saleArray);

  updateProductQuantity(saleArray, 'subtraction');

  return newSale;
};

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  const allSalesFormatted = { sales: allSales };
  return allSalesFormatted;
};

const getSaleById = async (id) => {
  const { notFoundMessage } = dictionary().messages;
  const { notFoundCode } = dictionary().code;
  const { notFoundStatus } = dictionary().status;

  if (id.length !== 24 || !await salesModel.getSaleById(id)) {
    return {
      err: { message: notFoundMessage, code: notFoundCode, status: notFoundStatus },
    };
  }

  const sale = await salesModel.getSaleById(id);

  return sale;
};

const updateSaleById = async (id, productIdAndquantity) => {
  const verifiedSale = productIdAndquantity.map((sale) => {
    if (validateQuantityTypeAndAmount(sale.quantity)) {
      return validateQuantityTypeAndAmount(sale.quantity);
    }
    return undefined;
  });

  const errorUpdate = verifiedSale.find((verifyAnError) => verifyAnError);

  if (errorUpdate) return errorUpdate;

  const previousSale = await salesModel.getSaleById(id);

  updateProductQuantity(previousSale.itensSold, 'sum');

  const saleUpdated = await salesModel.updateSaleById(id, productIdAndquantity);

  updateProductQuantity(saleUpdated.itensSold, 'subtraction');

  return saleUpdated;
};

const deleteSaleById = async (id) => {
  const { wrongSaleID } = dictionary().messages;
  const { invalidData } = dictionary().code;
  const { unprocessableEntity } = dictionary().status;

  if (id.length !== 24 || !await salesModel.getSaleById(id)) {
    return {
      err: { message: wrongSaleID, code: invalidData, status: unprocessableEntity },
    };
  }

  const sale = await salesModel.getSaleById(id);

  updateProductQuantity(sale.itensSold, 'sum');

  await salesModel.deleteSaleById(id);

  return sale;
};

module.exports = { addSale, getAllSales, getSaleById, updateSaleById, deleteSaleById };

const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { dictionary } = require('../helpers/dictionary');

const { validateQuantityTypeAndAmount, /* validateQuantityAmount, validateQuantityType, */
} = require('../validations/validation');

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

  saleArray.forEach(async (eachSale) => {
    const { productId, quantity: quantitySale } = eachSale;
    const { name, quantity: quantityProduct } = await productsModel.getProductById(productId);
    const quantity = quantityProduct - quantitySale;
    await productsModel.updateProductById(productId, name, quantity);
  });

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

  const errorUpdate = verifiedSale.find((b) => b);

  if (errorUpdate) return errorUpdate;

  const saleUpdated = await salesModel.updateSaleById(id, productIdAndquantity);

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
  sale.itensSold.forEach(async (eachSale) => {
    const { productId, quantity: quantitySale } = eachSale;
    const { name, quantity: quantityProduct } = await productsModel.getProductById(productId);
    const quantity = quantityProduct + quantitySale;
    await productsModel.updateProductById(productId, name, quantity);
  });

  await salesModel.deleteSaleById(id);

  return sale;
};

module.exports = { addSale, getAllSales, getSaleById, updateSaleById, deleteSaleById };

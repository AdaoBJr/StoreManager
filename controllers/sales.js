const rescue = require('express-rescue');
const Joi = require('joi');
const { getById } = require('../models/products');
const SalesServices = require('../services/sales');

const httpStatus = {
  ok: 200,
  created: 201,
  notFound: 404,
  invalidData: 422,
};

// validations
const validateQuantityArray = (req, res, next) => {
  const sales = req.body;
  const onlyQuantity = sales.map((sale) => sale.quantity || false);
  const schema = Joi.array().items(Joi.number().strict().min(0).required()).validate(onlyQuantity);
  
  if (schema.error) {
    return res.status(httpStatus.invalidData).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  next();
};

const validateIdArray = async (req, res, next) => {
  const sales = req.body;
  const productArray = sales.map((sale) => getById(sale.productId));
  const products = await (await Promise.all(productArray));
  const idsAreValid = products.every((product) => product && product.id); 
  if (idsAreValid) {
    return res.status(httpStatus.invalidData).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

const createSales = rescue(async (req, res) => {
  const sales = req.body;
  const insertedSale = await SalesServices.createSales(sales);
  res.status(httpStatus.ok).json(insertedSale);
});

module.exports = {
  validateQuantityArray,
  validateIdArray,
  createSales,
};

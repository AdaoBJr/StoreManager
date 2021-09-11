const rescue = require('express-rescue');
const Joi = require('joi');
const { ObjectId } = require('mongodb');

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

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const schema = Joi.object({
    id: Joi.string().required(),
  }).validate(req.params);
  if (schema.error || !ObjectId.isValid(id)) {
    return res.status(httpStatus.notFound).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  next();
};

// dealing with requests

const createSales = rescue(async (req, res) => {
  const sales = req.body;
  const insertedSale = await SalesServices.createSales(sales);
  res.status(httpStatus.ok).json(insertedSale);
});

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await SalesServices.getById(id);
  if (!sale) {
    return res.status(httpStatus.notFound).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  const { _id, productId, quantity } = sale;
  res.status(httpStatus.ok).json({
    _id,
    itensSold: [{ productId, quantity }],
  });
});

const getAllSales = rescue(async (req, res) => {
  const sales = await SalesServices.getAllSales();
  console.log(sales[1]);
  res.status(httpStatus.ok).json({ sales });
});

module.exports = {
  validateQuantityArray,
  validateIdArray,
  validateId,
  createSales,
  getSaleById,
  getAllSales,
};

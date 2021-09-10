const rescue = require('express-rescue');
const Joi = require('joi');
const { ObjectId } = require('mongodb');
const ProductsServices = require('../services/products');

const httpStatus = {
  ok: 200,
  notFound: 404,
  invalidData: 422,
};

// validations
const validateId = (req, res, next) => {
  const { id } = req.params;
  const schema = Joi.object({
    id: Joi.string().required(),
  }).validate(req.params);
  if (schema.error || !ObjectId.isValid(id)) {
    return res.status(httpStatus.invalidData).json({
      message: 'Wrong id format',
      error: 'invalid_data',
      code: httpStatus.invalidData,
    });
  }
  next();
};

// responses after validation
const getAll = rescue(async (_req, res) => {
  const allProducts = await ProductsServices.getAll();
  res.status(httpStatus.ok).json(allProducts);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ProductsServices.getById(id);
  console.log(product);
  res.status(200).json(product);
});

module.exports = {
  getAll,
  getById,
  validateId,
};

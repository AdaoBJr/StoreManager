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

const checkUniqueName = async (name) => {
  const product = await ProductsServices.getByName(name);
  return product;
};

const validateName = rescue(async (req, res, next) => {
  const { name } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  }).validate(req.body);

  if (schema.error) {
    const { error: { message } } = schema;
    return res.status(httpStatus.invalidData).json({ code: 'invalid_data', message });
  }
  
  const isUnique = await checkUniqueName(name);

  if (isUnique) {
    return res
      .status(httpStatus.invalidData)
      .json({ code: 'invalid_data', message: 'Product already exists' });
  }

  next();
});

// responses after validation
const getAll = rescue(async (_req, res) => {
  const allProducts = await ProductsServices.getAll();
  res.status(httpStatus.ok).json(allProducts);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ProductsServices.getById(id);
  res.status(200).json(product);
});

const createProduct = rescue(async (req, res) => {

});

module.exports = {
  getAll,
  getById,
  createProduct,
  validateId,
  validateName,
};

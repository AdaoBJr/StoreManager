const rescue = require('express-rescue');
const Joi = require('joi');
const { ObjectId } = require('mongodb');
const ServicesProducts = require('../services/products');

const httpStatus = {
  ok: 200,
  created: 201,
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
      err: {
        message: 'Wrong id format',
        code: 'invalid_data',
      },
    });
  }
  next();
};

const checkUniqueName = async (name) => {
  const product = await ServicesProducts.getByName(name);
  return product;
};

const validateName = rescue(async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  }).validate({ name: req.body.name });
  
  if (schema.error) {
    const { error: { message } } = schema;
    return res.status(httpStatus.invalidData).json({ err: { code: 'invalid_data', message } });
  }
  
  const { name } = req.body;
  const isUnique = await checkUniqueName(name);

  if (isUnique) {
    return res
      .status(httpStatus.invalidData)
      .json({ err: { code: 'invalid_data', message: 'Product already exists' } });
  }

  next();
});

const validatePostQuantity = (req, res, next) => {
  const schema = Joi.object({
    quantity: Joi.number().strict().min(1).required(),
  }).validate({ quantity: req.body.quantity });

  if (schema.error) {
    let { error: { message } } = schema;
    message = message.replace('greater', 'larger');
    return res.status(httpStatus.invalidData).json({ err: { code: 'invalid_data', message } });
  }

  next();
};

// responses after validation
const getAll = rescue(async (_req, res) => {
  const allProducts = await ServicesProducts.getAll();
  res.status(httpStatus.ok).json(allProducts);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ServicesProducts.getById(id);
  if (!product) {
    return res.status(httpStatus.invalidData).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  res.status(httpStatus.ok).json(product);
});

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const createdProduct = await ServicesProducts.createProduct(name, quantity);
  res.status(httpStatus.created).json({ _id: createdProduct, name, quantity });
});

const deleteById = rescue(async (req, res) => {
  const { id } = req.params;
  const deltedProduct = await ServicesProducts.getById(id)
    .then(() => ServicesProducts.deleteById(id));
  res.status(200).json(deltedProduct);
});

module.exports = {
  getAll,
  getById,
  createProduct,
  deleteById,
  validateName,
  validateId,
  validatePostQuantity,
};

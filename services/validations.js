const ProducSchema = require('../schemas/ProductSchema');
const { ApiError } = require('../utils/ApiError');
const { getProdByName } = require('../models/productModel');
const { findById } = require('../models/saleModel');

const BAD_REQUEST = 404;
const UNPROC = 422;
const len = 24;

const validateProduct = async (name, quantity) => {
  const validations = await ProducSchema.validate(name, quantity);
  if (validations.message) {
    throw new ApiError(validations.message, 'invalid_data', validations.code);
  }
  const product = await getProdByName(name);
  if (product) {
    throw new ApiError('Product already exists', 'invalid_data', 422);
  }
};

const validateProductId = async (id) => {
  const validations = await ProducSchema.validateId(id);

  if (validations.message) {
    throw new ApiError(validations.message, 'invalid_data', validations.code);
  }
};

const verifyQuantity = async (quantity, id) => {
  const validation = await ProducSchema
    .validateQuantity(quantity, id);

  if (validation.message) {
    return validation;
  }
  return false;
};

const validateSaleQuantity = async (body) => {
  const index = 0;
  const badCode = 404;
  let validation = {};

  for (let i = index; i < body.length; i += 1) {
    validation = verifyQuantity(body[i].quantity, body[i].productId);
  }

  const msg = await validation;
  if (msg) {
    const code = msg.code === badCode ? 'stock_problem' : 'invalid_data';
    throw new ApiError(msg.message, code, msg.code);
  }
};

const validateSaleId = async (id, meth) => {
  const errors = {
    notFound: { code: 'not_found', message: 'Sale not found', status: BAD_REQUEST },
    idFormat: { code: 'invalid_data', message: 'Wrong sale ID format', status: UNPROC },
  };

  if (id.length !== len || !(await findById(id))) {
    let err = {};
    if (meth === 'DELETE') err = errors.idFormat;
    else err = errors.notFound;
    throw new ApiError(err.message, err.code, err.status);
  }
};

module.exports = { validateProduct, validateProductId, validateSaleQuantity, validateSaleId };

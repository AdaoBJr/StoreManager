const models = require('../models/product');

const nameLengthError = new Error();
  nameLengthError.err = {
    status: 422,
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
};
const quantityValueError = new Error();
quantityValueError.err = {
  status: 422,
  code: 'invalid_data',
  message: '"quantity" must be larger than or equal to 1',
};
const quantityTypeError = new Error();
quantityTypeError.err = {
  status: 422,
  code: 'invalid_data',
  message: '"quantity" must be a number',
};
const productExistsError = new Error();
productExistsError.err = {
  status: 422,
  code: 'invalid_data',
  message: 'Product already exists',
};

const getAll = async () => {
  const model = await models.getAll();

  return model;
};

const getById = async (id) => {
  const model = models.getById(id);
  return model;
};

const create = async (product) => {
  const { name, quantity } = product;

  if (name.length < 5) throw nameLengthError;
  if (quantity < 1) throw quantityValueError;
  if (typeof quantity !== 'number') throw quantityTypeError;

  const productExists = await models.getByName(name);
  if (productExists) throw productExistsError;

  const model = await models.create(product);

  return model;
};

const update = async (id) => {
  const model = models.update(id);
  return model;
};

const remove = async (id) => {
  const model = models.remove(id);
  return model;
};

module.exports = { getAll, getById, create, update, remove };

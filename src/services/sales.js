const models = require('../models/sales');
const productModel = require('../models/product');

const invalidError = new Error();
invalidError
  .err = { status: 422, code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };

const validatePromisse = (sales) => Promise
  .all(sales.map((curr) => productModel.getById(curr.productId)))
    .then((values) => values)
    .catch((err) => err);

const getAll = async () => {
  const model = await models.getAll();
  return model;
};

const getById = async (id) => {
  const model = models.getById(id);
  return model;
};

const create = async (sales) => {
  const products = await validatePromisse(sales);

  sales.map((curr) => {
    if (curr.quantity < 1 || typeof curr.quantity !== 'number') throw invalidError;
    return true;
  });

  products.map((curr) => {
    if (curr === null) throw invalidError;
    return true;
  });

  const model = models.create(sales);
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

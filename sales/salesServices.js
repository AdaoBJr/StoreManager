const model = require('./salesModels');

const getAll = async () => {
  const sales = await model.getAll();
  return sales;
};

const getById = async (id) => {
  const error = new Error();
  error.err = {
    code: 'not_found',
    message: 'Sale not found',
  };

  if (id.length !== 24) throw error;

  const sale = await model.getById(id);

  // if (!sale) throw error;

  return sale;
};

const create = (sales) => {
  console.log(sales);
};

const update = () => {};

const remove = () => {};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

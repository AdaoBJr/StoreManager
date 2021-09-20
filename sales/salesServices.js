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
  // const error = new Error();
  //   error.err = {
  //     code: 'invalid_data',
  //     message: 'Wrong product ID or invalid quantity',
  //   };

  // if (product === false || product === '') throw error;
  // if (typeof quantity !== 'number' || quantity < 1) throw error;

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

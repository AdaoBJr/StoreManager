const model = require('./salesModels');
const { registeredProductValidate } = require('./salesValidations');

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

const create = async (sales) => {
  const error = new Error();
  error.err = {
    code: 'invalid_data',
    message: 'Wrong product ID or invalido quantity',
  };

  await registeredProductValidate(sales);

  const retorno = await model.productExists(sales);

  for (let i = 0; i < retorno.length; i += 1) {
      if (retorno.includes(null)) throw error;
      if (retorno[i].quantity < 1) throw error;
    }

  const newSales = await model.create(sales);
  return newSales;
};

const update = () => {};

const remove = () => {};

const testes = async (_param) => {

};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  testes,
};

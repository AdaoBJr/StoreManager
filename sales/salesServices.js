const model = require('./salesModels');
const { registeredProductValidate } = require('./salesValidations');

const validQuantity = (sales) => {
  const validQuantityS = sales.filter((sale) => sale.quantity <= 0);

  return validQuantityS;
};

const validTypeQuantity = (sales) => {
  const filtered = sales.filter((sale) => typeof (sale.quantity) !== 'number');
  return filtered;
};

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

  if (!sale) throw error;

  return sale;
};

const create = async (sales) => {
  const error = new Error();
  error.err = {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
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

const update = async (id, sale) => {
  const productExists = await model.saleExists(id);

  if (productExists) {
    const response = await model.update(id, sale);

    return response;
  }
  return false;
};

const remove = async (id) => {
  const deleted = await model.remove(id);

  return deleted;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  validQuantity,
  validTypeQuantity,
};

const Sale = require('../models/Sale');

const getAll = async () => Sale.getAll();

const generateError = (message, code = 'invalid_data', status = 422) => (
  {
    error: {
      code,
      status,
      message,
    },
  }
);

const findById = async (id) => {
  const sale = await Sale.findById(id);

  if (!sale) return generateError('Sale not found', 'not_found', 404);
  
  return sale;
};

const isNotValidQuantity = (sale) => sale
  .some(({ quantity }) => quantity <= 0 || !Number.isInteger(quantity));

const create = async (sale) => {
  if (isNotValidQuantity(sale)) {
    return generateError('Wrong product ID or invalid quantity');
  }
  return Sale.create(sale);
};

const update = async (id, sale) => {
  console.log('sale', sale);
  console.log('id', id);
  if (isNotValidQuantity(sale)) {
    return generateError('Wrong product ID or invalid quantity');
  }
  return Sale.update(id, sale);
};

const remove = async (id) => {
  const sale = await Sale.findById(id);
  if (!sale) return generateError('Wrong sale ID format');

  return Sale.remove(id) ? sale : null;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
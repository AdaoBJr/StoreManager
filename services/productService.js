const { create,
  getByName, getAll, getById, update, exclude } = require('../models/productModel');
const { errorBusiness } = require('../errors/errors');

const filterById = async (id) => {
  const products = await getById(id);
  if (!products) {
    return errorBusiness('Wrong id format');
  }

  return products;
};

const createService = async (name, quantity) => {
  const fliterName = await getByName(name);
  if (fliterName) {
    return errorBusiness('Product already exists'); 
  }

  const createProduct = await create(name, quantity);
  return createProduct;
};

const excludeService = async (id) => {
  const products = await exclude(id);
  if (!products) return errorBusiness('Wrong id format');
  return products;
};

module.exports = {
  createService,
  getAll,
  filterById,
  update,
  excludeService,
};

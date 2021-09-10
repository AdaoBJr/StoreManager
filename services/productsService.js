const ProductsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
    const { id } = await ProductsModel
    .create({ name, quantity });

  return { id };
};

const getAll = async () => {
  const { products } = await ProductsModel
  .getAll();

return { products };
};

const findById = async ({ id }) => {
  const { product } = await ProductsModel
  .findById({ id });

  return { product };
};

module.exports = {
  create,
  getAll,
  findById,
};
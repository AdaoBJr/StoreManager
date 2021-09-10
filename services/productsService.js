const ProductsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
    const { id } = await ProductsModel
    .create({ name, quantity });

  return { id };
};

module.exports = {
  create,
};
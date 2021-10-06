const Products = require('../models/products');

const create = async (name, quantity) =>
  Products.create(name, quantity);

module.exports = {
  create,
};

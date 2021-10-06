const Products = require('../models/Products');

const create = async (name, quantity) =>
  Products.create(name, quantity);

module.exports = {
  create,
};

const Products = require('../models/Products');

// const getAll = async () => Author.getAll();

// const findById = async (id) => Author.findById(id);

const create = async (name, quantity) =>
  Products.create(name, quantity);

module.exports = {
  create,
};
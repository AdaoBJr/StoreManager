const salesModel = require('../models/salesModel');

const create = async (sales) => salesModel.create(sales);

module.exports = {
  create,
};
const salesModel = require('../models/salesModel');

const createSale = async (arr) => salesModel.createSale(arr);

module.exports = {
  createSale,
};
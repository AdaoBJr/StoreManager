const { includeSales } = require('../models/salesModel');

const include = async (sales) => includeSales(sales);

module.exports = {
  include,
};
const saleSchema = require('../schemas/saleSchema');

const bodyValidation = (sales) => saleSchema.validate(sales);

module.exports = {
  bodyValidation,
};

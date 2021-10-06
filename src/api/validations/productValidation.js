const productSchema = require('../schemas/productSchema');
const { getProductByName } = require('../../../models/productsModel');

const bodyValidation = (product) => productSchema.validate(product);

const nameValidation = (name) => getProductByName(name);

module.exports = {
  bodyValidation,
  nameValidation,
};

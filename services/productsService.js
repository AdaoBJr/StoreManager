const ProductsModel = require('../models/ProductsModel');

const createProduct = async (name, quantity) => {
  const product = await ProductsModel.findByName(name);

    if (product) {
      return { err: { code: 'invalid_date', message: 'Product exists already' } };
      }

      const { insertdId } = await ProductsModel.createProduct(name, quantity);
      return {
        _id: insertdId,
        name,
        quantity,
      };
};

module.exports = {
  createProduct,
};
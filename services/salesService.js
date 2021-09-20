const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const validateQuantity = (sales) => {
  const salesQuantities = sales.map(({ quantity }) => {
    if (!Number.isInteger(quantity) || quantity <= 0) return false;
    return true;
  });

  const isAllValid = salesQuantities.every((sale) => sale === true);
  return isAllValid;
};

const validateProducts = async (sales) => {
  const findProductsById = sales.map(
    async (product) => {
      const foundProduct = await productsModel.getProductById(product.productId);
      if (!foundProduct) return null;

      return foundProduct;
    },
  );

  const isAllQuantitiesValid = validateQuantity(sales);
  const hasNotFound = await Promise.all(findProductsById)
    .then((products) => products.some((product) => product === null));
  
  return {
    isAllQuantitiesValid,
    hasNotFound,
  };
};

const createSales = async (sales) => {
  const { hasNotFound, isAllQuantitiesValid } = await validateProducts(sales);
  
  if (hasNotFound || !isAllQuantitiesValid) {
    return {
      error: {
        status: 422,
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  
  const { insertedId } = await salesModel.createSale(sales);

  return {
    _id: insertedId,
    itensSold: sales,
  };
};

module.exports = {
  createSales,
};
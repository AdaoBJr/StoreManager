const ProductModel = require('../models/ProductModel');

const findById = async (id) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

const findAll = () => ProductModel.findAll();

const create = async (name, quantity) => {
  const existingProduct = await ProductModel.findByName(name);

  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return ProductModel.create(name, quantity);
};

const update = (id, name, quantity) => ProductModel.update(id, name, quantity);

const exclude = async (id) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return ProductModel.exclude(id);
};

const updateFromSale = async (sale, incresse) => {
  const results = sale.map(async ({ productId, quantity }) => {
    const product = await findById(productId);

    if (product.quantity < quantity) return false;

    await ProductModel.updateFromSale(productId, quantity, incresse);
    
    return true;
  });

  const resolve = await Promise.all(results);
  
  if (resolve.includes(false)) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
  }

  return {};
};

module.exports = {
  findById,
  findAll,
  create,
  update,
  exclude,
  updateFromSale,
};

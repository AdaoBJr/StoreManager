const Product = require('../models/Product');

const getAll = async () => Product.getAll();

const invalidDataError = (message) => (
  {
    error: {
      code: 'invalid_data',
      message,
    },
  }
);

const findById = async (id) => {
  const product = await Product.findById(id);

  if (!product) return invalidDataError('Wrong id format');
  
  return product;
};

const create = async (name, quantity) => {
  if (name.length < 5) return invalidDataError('"name" length must be at least 5 characters long');
  // if (name.length < 5) {
  //   console.log('name é menor que 5 caracteres');
  //   return {
  //     error: {
  //       code: 'invalidData',
  //       message: '"name" length must be at least 5 characters long',
  //     },
  //   };
  // }
  if (!Number.isInteger(quantity)) return invalidDataError('"quantity" must be a number');

  if (quantity <= 0) return invalidDataError('"quantity" must be larger than or equal to 1');

  const existingProduct = await Product.findByName(name);
  if (existingProduct) return invalidDataError('Product already exists');

  return Product.create(name, quantity);
};

const update = async (id, name, quantity) => {
  if (name.length < 5) return invalidDataError('"name" length must be at least 5 characters long');
 
  if (!Number.isInteger(quantity)) return invalidDataError('"quantity" must be a number');

  if (quantity <= 0) return invalidDataError('"quantity" must be larger than or equal to 1');
  return Product.update(id, name, quantity);
};

const remove = async (id) => {
  const product = await Product.findById(id);
  if (!product) return invalidDataError('Wrong id format');

  return Product.remove(id) ? product : null;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
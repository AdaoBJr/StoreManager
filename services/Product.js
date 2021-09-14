const Product = require('../models/Product');

const getAll = async () => Product.getAll();

const findById = async (id) => {
  // Solicitamos que o model realize a busca no banco
  const product = await Product.findById(id);

  // Caso nenhum produto seja encontrado, retornamos um objeto de erro.
  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: `Não foi possível encontrar um produto com o id ${id}`,
      },
    };
  }

  // Caso haja um produto com o ID informado, retornamos esse produto
  return product;
};

const invalidDataError = (message) => (
  {
    error: {
      code: 'invalidData',
      message,
    },
  }
);

const create = async (name, quantity) => {
  if (name.length < 5) return invalidDataError('"name" length must be at least 5 characters long');
 
  if (Number.isInteger(quantity)) return invalidDataError('"quantity" must be a number');

  if (quantity <= 0) return invalidDataError('"quantity" must be larger than or equal to 1');

  const existingProduct = await Product.findByName(name);
  if (existingProduct) return invalidDataError('Product already exists');

  return Product.create(name, quantity);
};

const update = async (id, name, quantity) => {
  if (name.length < 5) return invalidDataError('"name" length must be at least 5 characters long');
 
  if (Number.isInteger(quantity)) return invalidDataError('"quantity" must be a number');

  if (quantity <= 0) return invalidDataError('"quantity" must be larger than or equal to 1');
  return Product.update(id, name, quantity);
};

const remove = async (id) => {
  const product = await Product.findById(id);
  if (!product) return invalidDataError('Wrong id format');

  return Product.remove(id);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
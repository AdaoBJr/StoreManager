const productsModel = require('../models/productsModel');

// const getAll = async () => Author.getAll();

// const findById = async (id) => Author.findById(id);

const validateLenghtName = (req, _res, _next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return {
      number: 422,
      error: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return false;
};

const validateQuantityType = (req, _res, _next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
      return { 
      number: 422,
      error: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
} return false;
};

const validateQuantity = (req, _res, _next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return { 
      number: 422,
      error: { 
        code: 'invalid_data', 
        message: '"quantity" must be larger than or equal to 1', 
      }, 
    };
  } return false;
};

const create = async (name, quantity) => {
  // Buscamos um autor com o mesmo nome completo que desejamos criar
  const existingProduct = await productsModel.findByName(name, quantity);
  console.log(existingProduct);
    // Caso esse autor já exista, retornamos um objeto de erro informando
  // que não é possível criar o autor pois ele já existe
  if (existingProduct) {
    return {
      number: 422,
      error: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return productsModel.create(name, quantity);
};

module.exports = {
  create,
  validateLenghtName,
  validateQuantityType,
  validateQuantity,
};
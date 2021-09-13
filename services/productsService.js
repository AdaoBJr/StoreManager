const productsModel = require('../models/productsModel');
const validations = require('../middlewares/validate');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  // Solicitamos que o model realize a busca no banco
  const product = await productsModel.getById(id);

  // Caso nenhum autor seja encontrado, retornamos um objeto de erro.
  if (!product) {
    return {
      number: 422,
      error: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  // Caso haja um autor com o ID informado, retornamos esse autor
  return product;
};

const create = async (name, quantity) => {
  // Buscamos um autor com o mesmo nome completo que desejamos criar
  const existingProduct = await productsModel.findByName(name, quantity);
  
  const validationArray = [
    'productExists',
    'validateLenghtName',
    'validateQuantityType',
    'validateQuantity',
  ];
  
  for (let i = 0; i < validationArray.length; i += 1) {
    const isValid = validations[validationArray[i]]({ name, quantity, existingProduct });
    if (isValid) return (isValid);
  }
  return productsModel.create(name, quantity);
};

module.exports = {
  getAll,
  getById,
  create,
};
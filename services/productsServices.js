const productsModel = require('../models/productsModel');
const validations = require('../middlewares/validate');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    return {
      number: 422,
      error: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

const create = async (name, quantity) => {
  const existingProduct = await productsModel.findByName(name, quantity);
  
  const isvalid = validations.isValidated({ name, quantity, existingProduct });

  if (isvalid) return isvalid;

  return productsModel.create(name, quantity);
};

module.exports = {
  getAll,
  getById,
  create,
};

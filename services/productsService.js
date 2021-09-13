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
  // Buscamos um produto com o mesmo nome que desejamos criar
  const existingProduct = await productsModel.findByName(name, quantity);

  const isExist = validations.productExists(existingProduct);

  if (isExist) return isExist;
  
  const isvalid = validations.isValidated({ name, quantity });

  if (isvalid) return isvalid;

  return productsModel.create(name, quantity);
};

const update = async (id, name, quantity) => {
  // Buscamos um produto com o mesmo nome que desejamos criar
  const getProduct = await getById(id);

  if (getProduct.error) return getProduct;
  
  const isvalid = validations.isValidated({ name, quantity });

  if (isvalid) return isvalid;

  return productsModel.update(id, name, quantity);
};

const deleteOne = async (id) => {
  const getProduct = await getById(id);

  if (getProduct.error) return getProduct;

  productsModel.deleteOne(id);
  
  return getProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
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

  const isExist = validations.productExists(existingProduct);

  if (isExist) return isExist;

  const isvalid = validations.isValidated({ name, quantity });

  if (isvalid) return isvalid;

  return productsModel.create(name, quantity);
};

const update = async (id, name, quantity) => {
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

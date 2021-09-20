const {
  addProduct,
  deleteProduct,
  getProductById,
  changeProduct,
  updateData,
} = require('../models/productsMdl');

const add = async (name, quantity) => addProduct(name, quantity);

const remove = async (id) => deleteProduct(id);

const getById = async (id) => getProductById(id);

const update = async (id, name, quantity) => {
  await changeProduct(id, name, quantity);

  return {
    _id: id,
    name,
    quantity,
  };
};

const updateStock = (id, quantity) => {
  updateData(id, quantity);
};

module.exports = { 
  add,
  getById,
  update,
  remove,
  updateStock,
};

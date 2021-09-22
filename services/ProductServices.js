const {
  newProduct, findProduct, findOneProduct, updateProduct, deleteProduct,
} = require('../models/ProductsModel');
const { deleteProductMiddleware } = require('../middlewares/ProductsMiddlewares');

const create = async ({ name, quantity }) => {
  const newProducts = await newProduct({ name, quantity });
  return newProducts;
};

const find = async () => {
  const findProducts = await findProduct();
  return findProducts;
};

const findOne = async (id) => {
  const findProducts = await findOneProduct(id);
  return findProducts;
};

const update = async ({ id, name, quantity }) => {
  const updateProductService = await updateProduct({ id, name, quantity });
  return updateProductService;
};

const deleteP = async ({ id }) => {
  const product = await deleteProductMiddleware({ id });
  
  if (!product) {
    return product;
  }
  const { name, quantity, _id } = product;
  await deleteProduct({ id });
  return { name, quantity, _id };
};

module.exports = {
  create,
  find,
  findOne,
  update,
  deleteP,
};

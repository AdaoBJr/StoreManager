const ModelProducts = require('../model/modelProducts');

const { isValid, findByName, productExists } = require('../schemas/schemasValidate');

const findById = async (id) => {
  const productFound = await ModelProducts.findById(id);
  
  if (!productFound) return { err: { code: 'invalid_data', message: 'Wrong id format' } };

  return productFound;
};

const deleteProduct = async (id) => {
  const productFound = await productExists({ id });
  
  if (!productFound) return { err: { code: 'invalid_data', message: 'Wrong id format' } };

  const { name, quantity, _id } = productFound;
  await ModelProducts.deleteProduct({ id });

  return { name, quantity, _id };
};

const update = async (id, newName, newQuantity) => {
  let productFound = await ModelProducts.findById(id);

  const productUpdateValid = await isValid(newName, newQuantity);

  if (productUpdateValid.err) return productUpdateValid;

  productFound = {
    name: newName,
    quantity: newQuantity,
  };
  
  return productFound;
};

const getAll = async () => {
  const productsList = {
    products: await ModelProducts.getAll(),
  };

  return productsList;
};

const create = async ({ name, quantity }) => {
  const vaildName = await findByName(name);
  if (vaildName.err) return vaildName;
  
  const newProductValid = await isValid(name, quantity);
  if (newProductValid.err) return newProductValid;

  const product = await ModelProducts.create({ name, quantity });
  return product;
};

module.exports = { create, getAll, findById, update, deleteProduct };
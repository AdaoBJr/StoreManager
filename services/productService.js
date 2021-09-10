const { createProd,
  getAllProds,
  getProdById,
  deleteProduct,
  getProdByName,
  updateProd } = require('../models/productModel');

  const createProduct = async (name, quantity) => {
    let product = await getProdByName(name);

    if (!product) {
      product = await createProd(name, quantity);
      return product;
    }
      return { err: {
        code: 'invalid_data',
        message: 'Product already exists',
      } };
  };

const getAllProducts = async () => {
  const response = await getAllProds();
  return response;
};

const getProductById = async (id) => {
  const response = await getProdById(id);
  return response;
};

const updateProduct = async (id, name, quantity) => {
  const product = await updateProd(id, name, quantity);
  return product;
};

const removeProduct = async (id) => {
  const product = await deleteProduct(id);
  return product;
};

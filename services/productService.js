const { createProd,
  getAllProds,
  getProdById,
  deleteProduct,
  getProdByName,
  updateProd } = require('../models/productModel');

const getAllProducts = async () => {
  const response = await getAllProds();
  return response;
};

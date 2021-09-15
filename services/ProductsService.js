// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const ProductsModel = require('../models/ProductsModel');

// ------------------------------------------------------------------
// Requisito 1: SERVICE responsável por fazer a chamada ao MODEL de cadsatro produtos(Validações via middleware)

const postProducts = async ({ name, quantity }) => {
  const newProduct = await ProductsModel.postProducts({ name, quantity });

  return newProduct;
};

// ------------------------------------------------------------------
// Requisito 2: SERVICEs responsáveis por fazerem a chamada aos MODELs de busca de produtos ou de produto específico, filtrado por ID(Validações via middleware)

const getProducts = async () => {
  const products = await ProductsModel.getProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await ProductsModel.getProductById(id);

  return product;
};

// ------------------------------------------------------------------
// Requisito 3: SERVICE responsável por fazer a chamada ao MODEL de atualização de produtos(Validações via middleware)

const putProductById = async ({ id, name, quantity }) => {
  const product = await ProductsModel.putProductById({ id, name, quantity });

  return product;
};

// ------------------------------------------------------------------

module.exports = {
  postProducts,
  getProducts,
  getProductById,
  putProductById,
};

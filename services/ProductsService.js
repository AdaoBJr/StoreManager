// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const ProductsModel = require('../models/ProductsModel');

const postProducts = async (name, quantity) => {
  const newProduct = await ProductsModel.postProducts(name, quantity);

  if (!newProduct) {
    return null; 
  }

  return newProduct;
};

module.exports = {
  postProducts,
};
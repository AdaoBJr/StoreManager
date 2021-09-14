// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const ProductsModel = require('../models/ProductsModel');

// ------------------------------------------------------------------
// Requisito 1: SERVICE responsável por realizar as validações necessárias e fazer chamada ao MODEL de cadsatro produtos

const postProducts = async ({ name, quantity }) => {
  if (typeof (name) !== 'string' || name.length <= 5) return { isError: true, code: 422, message: 'Nome deve ser uma string com mais de 5 caracteres' };
  
  const nameExists = await ProductsModel.findProductByName({ name });
  
  if (nameExists) return { isError: true, message: 'Produto já está cadastrado' };

  const newProduct = await ProductsModel.postProducts({ name, quantity });

  if (!newProduct) return { isError: true, message: 'Produto não foi cadastrado' };
  
  return { code: 200, newProduct };
};

// ------------------------------------------------------------------

module.exports = {
  postProducts,
};

// Validações são feitas no service
// excessões são tratadas primeiro
// if ( title !-- "string"){
  // return { isError: }

// No Controller
// if (result === isError) return resizeBy.status(401).....
// }
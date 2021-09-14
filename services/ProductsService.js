// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const ProductsModel = require('../models/ProductsModel');
const { validatePostProduct } = require('../schemas/productSchema');

// ------------------------------------------------------------------
// Requisito 1: SERVICE responsável por validar se o NOME do produto já existe, e se não existir fazer a chamada ao MODEL de cadsatro produtos

const postProducts = async ({ name, quantity }) => {
  const validations = validatePostProduct({ name, quantity });

  if (validations.message) return validations;

  const nameExists = await ProductsModel.findProductByName({ name });
  
  if (nameExists) return { code: 422, message: 'Product already exists' };

  const newProduct = await ProductsModel.postProducts({ name, quantity });

  if (!newProduct) return { code: 422, message: 'Product was not created' };
  
  return { code: 201, newProduct };
};

// ------------------------------------------------------------------

module.exports = {
  postProducts,
};

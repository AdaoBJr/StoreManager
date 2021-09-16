// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const SalesModel = require('../models/SalesModel');

// ------------------------------------------------------------------
// Requisito 5: SERVICE responsável por fazer a chamada ao MODEL de cadsatro vendas(Validações via middleware)

const postSales = async (saleItems) => {
  const newSale = await SalesModel.postSales(saleItems);

  return newSale;
};

// ------------------------------------------------------------------
// Requisito 6: SERVICEs responsáveis por fazerem a chamada aos MODELs de busca de todas as vendas ou venda específica, filtrada por ID(Validações via middleware)

const getSales = async () => {
  const sales = await SalesModel.getSales();

  return sales;
};

const getSalesById = async (id) => {
  const product = await SalesModel.getSalesById(id);

  return product;
};

// ------------------------------------------------------------------
// Requisito 7: SERVICE responsável por fazer a chamada ao MODEL de atualização de produtos(Validações via middleware)

// const putProductById = async ({ id, name, quantity }) => {
//   const product = await SalesModel.putProductById({ id, name, quantity });

//   return product;
// };

// // ------------------------------------------------------------------
// // Requisito 4: SERVICE responsável por fazer a chamada ao MODEL de deleção de produto por ID(Validações via middleware)

// const deleteProductById = async (id) => {
//   const product = await SalesModel.deleteProductById(id);

//   return product;
// };

// ------------------------------------------------------------------

module.exports = {
  postSales,
  getSales,
  getSalesById,
};

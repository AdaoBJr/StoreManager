const express = require('express');
const {
  validateProductSaleQuantity,
  validateIdSales,
} = require('../middlewares/salesMiddlewares');

const SalesService = require('../services/SalesService');

const salesRouter = express.Router();

// ------------------------------------------------------------------
// Requisito 5: CONTROLLER responsável por receber a requisição de cadastro de vendas, fazer chamada ao SERVICE, e retornar vendas cadastradas

salesRouter.post('/', validateProductSaleQuantity, async (req, res) => {
  const saleItems = req.body;

  const newSale = await SalesService.postSales(saleItems);

  return res.status(200).json(newSale);
});

// ------------------------------------------------------------------
// Requisito 6: CONTROLLERS responsáveis por receber a requisição de listagem geral de vendas ou por ID, fazer chamada ao SERVICE, e retornar todas as vendas ou venda específica filtrado por ID.

salesRouter.get('/', async (req, res) => {
  const salesAll = await SalesService.getSales();
  
  return res.status(200).json({ sales: salesAll });
});

salesRouter.get('/:id', validateIdSales, async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.getSalesById(id);

  return res.status(200).json(sale);
});

// ------------------------------------------------------------------
// Requisito 7: CONTROLLER responsável por receber a requisição de atualização de venda por ID, fazer chamada ao SERVICE, e retornar a venda atualizada

salesRouter.put('/:id', validateIdSales, validateProductSaleQuantity, async (req, res) => {
  const { id } = req.params;
  const updateItem = req.body;

  const sale = await SalesService.putSaleById({ id, updateItem });

  return res.status(200).json(sale);
});

// ------------------------------------------------------------------
// Requisito 8: CONTROLLER responsável por receber a requisição de deletar de produtos por ID, fazer chamada ao SERVICE, e retornar msg de confirmação

// productRouter.delete('/:id', validateId, async (req, res) => {
//   const { id } = req.params;

//   const product = await ProductsService.deleteProductById(id);

//   return res.status(200).json(product);
// });

// ------------------------------------------------------------------

module.exports = {
  salesRouter,
};

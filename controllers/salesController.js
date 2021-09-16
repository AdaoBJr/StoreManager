const express = require('express');
const { validateIdProductExists } = require('../middlewares/productsMiddlewares');

const SalesService = require('../services/SalesService');

const salesRouter = express.Router();

// ------------------------------------------------------------------
// Requisito 5: CONTROLLER responsável por receber a requisição de cadastro de vendas, fazer chamada ao SERVICE, e retornar vendas cadastradas

salesRouter.post('/', validateIdProductExists, async (req, res) => {
  const saleItems = req.body;

  const newSale = await SalesService.postSales(saleItems);

  return res.status(201).json(newSale);
});

// ------------------------------------------------------------------
// Requisito 6: CONTROLLERS responsáveis por receber a requisição de listagem geral de produtos ou por ID, fazer chamada ao SERVICE, e retornar os produtos ou o produto específico filtrado por ID, já cadastrador na base.

// productRouter.get('/', async (req, res) => {
//   const products = await ProductsService.getProducts();

//   return res.status(200).json({ products });
// });

// productRouter.get('/:id', validateId, async (req, res) => {
//   const { id } = req.params;

//   const product = await ProductsService.getProductById(id);

//   return res.status(200).json(product);
// });

// ------------------------------------------------------------------
// Requisito 3: CONTROLLER responsável por receber a requisição de atualização de produtos por ID, fazer chamada ao SERVICE, e retornar o produto atualizado

// productRouter.put('/:id', validateId, validateNameQuantity, async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   const product = await ProductsService.putProductById({ id, name, quantity });

//   return res.status(200).json(product);
// });

// ------------------------------------------------------------------
// Requisito 4: CONTROLLER responsável por receber a requisição de deletar de produtos por ID, fazer chamada ao SERVICE, e retornar msg de confirmação

// productRouter.delete('/:id', validateId, async (req, res) => {
//   const { id } = req.params;

//   const product = await ProductsService.deleteProductById(id);

//   return res.status(200).json(product);
// });

// ------------------------------------------------------------------

module.exports = {
  salesRouter,
};

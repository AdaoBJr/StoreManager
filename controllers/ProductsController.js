// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const express = require('express');
const {
  validateNameQuantity,
  validateExists,
  validateId,
} = require('../middlewares/productsMiddlewares');
const ProductsService = require('../services/ProductsService');

// Source: https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-middlewares/0ba5165f-5fda-4b6b-8de7-d2ccf5782c18/conteudos/e0470c45-ed25-49b8-9675-47bb00b17e42/router-middleware/457000ee-68cb-4489-a75c-9ec061aca1a2?use_case=side_bar
const productRouter = express.Router();

// ------------------------------------------------------------------
// Requisito 1: CONTROLLER responsável por receber a requisição de cadastro de produto, fazer chamada ao SERVICE, e retornar produto cadastrado

productRouter.post('/', validateExists, validateNameQuantity, async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductsService.postProducts({ name, quantity });

  return res.status(201).json(newProduct);
});

// ------------------------------------------------------------------
// Requisito 2: CONTROLLERS responsáveis por receber a requisição de listagem geral de produtos ou por ID, fazer chamada ao SERVICE, e retornar os produtos ou o produto específico filtrado por ID, já cadastrador na base.

productRouter.get('/', async (req, res) => {
  const products = await ProductsService.getProducts();

  return res.status(200).json({ products });
});

productRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.getProductById(id);

  return res.status(200).json(product);
});

// ------------------------------------------------------------------
// Requisito 3: CONTROLLERS responsáveis por receber a requisição de atualização de produtos por ID, fazer chamada ao SERVICE, e retornar o produto atualizado

productRouter.put('/:id', validateId, validateNameQuantity, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductsService.putProductById({ id, name, quantity });

  return res.status(200).json(product);
});

// ------------------------------------------------------------------

module.exports = {
  productRouter,
};

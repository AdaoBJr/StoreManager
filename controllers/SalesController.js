const express = require('express');
const {
  validateProductSaleQuantity,
  validateIdSalesIsValid,
  validateSaleExistsById,
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

salesRouter.get('/:id', validateIdSalesIsValid, async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.getSalesById(id);

  if (!sale) {
    return res.status(404).json(
      { err:
        { code: 'not_found', message: 'Sale not found' },
      },
    );
  }

  return res.status(200).json(sale);
});

// ------------------------------------------------------------------
// Requisito 7: CONTROLLER responsável por receber a requisição de atualização de venda por ID, fazer chamada ao SERVICE, e retornar a venda atualizada

salesRouter.put('/:id', validateProductSaleQuantity, async (req, res) => {
  const { id } = req.params;
  const updateItem = req.body;

  const sale = await SalesService.putSaleById({ id, updateItem });

  return res.status(200).json(sale);
});

// ------------------------------------------------------------------
// Requisito 8: CONTROLLER responsável por receber a requisição de deletar a venda por ID, fazer chamada ao SERVICE, e retornar msg de confirmação

salesRouter.delete('/:id', validateSaleExistsById, async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.deleteSaleById(id);
  console.log(`Sale controller: ${sale}`);

  if (!sale) {
    return res.status(422).json(
      { err:
        { code: 'invalid_data', message: 'Wrong sale ID format' },
      },
    );
  }
  const { itensSold } = sale;
  console.log(`ItensSold controller: ${itensSold}`);

  return res.status(200).json({ _id: id, itensSold });
});

// ------------------------------------------------------------------

module.exports = {
  salesRouter,
};

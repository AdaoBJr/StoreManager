// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const { ObjectId } = require('mongodb');
const { validateQuantitySchema } = require('../schemas/productSchema');
const SalesModel = require('../models/SalesModel');

// Comments: Valida se o ID (MongoDB) da VENDA é válido 
const validateIdSales = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json(
      { err:
        { code: 'not_found', message: 'Sale not found' },
      },
    ); 
  }

  next();
};

// Comments: Valida se o campo QUANTITY do produto, dentro da VENDA, é válido
const validateProductSaleQuantity = async (req, res, next) => {
  const saleItems = req.body;

  for (let index = 0; index < saleItems.length; index += 1) {
    const element = saleItems[index];
    const { code, message } = validateQuantitySchema(element.quantity);

    if (message) {
      return res.status(code).json(
        { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
      );
    }
  }

  next();
};

// Comments: Valida se a venda existe na base para ser deletada 
const validateSaleExistsById = async (req, res, next) => {
  const { id } = req.params;

  const saleExists = await SalesModel.getSalesById(id);
  
  if (!saleExists) {
    return res.status(422).json(
      { err:
        { code: 'invalid_data', message: 'Wrong sale ID format' },
      },
    ); 
  }

  next();
};

module.exports = {
  validateIdSales,
  validateProductSaleQuantity,
  validateSaleExistsById,
};
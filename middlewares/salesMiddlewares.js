// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const { ObjectId } = require('mongodb');
const { validateQuantitySchema } = require('../schemas/productSchema');
const ProductsModel = require('../models/ProductsModel');

// Comments: Valida se o ID (MongoDB) informado é válido 
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

// Middleware inutilizado
const validateIdProductExists = async (req, res, next) => {
  const saleItems = req.body;

  const products = await ProductsModel.getProducts();

  for (let index = 0; index < saleItems.length; index += 1) {
    const element = saleItems[index];

    const containId = products.find((product) => product.id === element.productId);
    console.log(containId);

    if (containId) {
      return res.status(422).json(
        { err:
          { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
        },
      );
    }

    // const product = ProductsModel.getProductById(element.productId);
    
    // if (!product) {
    //   return res.status(422).json(
    //     { err:
    //       { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    //     },
    //   );
    // }
  }
  
  next();
};

module.exports = {
  validateIdSales,
  validateIdProductExists,
  validateProductSaleQuantity,
};
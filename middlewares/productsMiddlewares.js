// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const { ObjectId } = require('mongodb');
const { validateNameSchema, validateQuantitySchema } = require('../schemas/productSchema');
const ProductsModel = require('../models/ProductsModel');

// Comments: Valida os argumentos passados como parâmetros e então se produto existe na base de dados 
const validateName = async (req, res, next) => {
  const { name } = req.body;

  const { code, message } = validateNameSchema(name);

  if (message) return res.status(code).json({ err: { code: 'invalid_data', message } });

  next();
};

const validateQuantity = async (req, res, next) => {
  const { quantity } = req.body;

  const { code, message } = validateQuantitySchema(quantity);

  if (message) return res.status(code).json({ err: { code: 'invalid_data', message } });

  next();
};

// Comments: Valida os argumentos passados como parâmetros e então se produto existe na base de dados 
const validateNameExists = async (req, res, next) => {
  const { name } = req.body;

  const nameExists = await ProductsModel.findProductByName(name);
  
  if (nameExists) {
    return res.status(422).json(
      { err:
        { code: 'invalid_data', message: 'Product already exists' },
      },
    ); 
  }

  next();
};

// Comments: Valida se o ID (MongoDB) informado é válido 
const validateIdParams = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(422).json(
      { err:
        { code: 'invalid_data', message: 'Wrong id format' },
      },
    ); 
  }

  next();
};

const validateIdProductExists = async (req, res, next) => {
  const saleItems = req.body;

  saleItems.forEach(async (element) => {
    const product = await ProductsModel.getProductById(element.productId);
    
    if (!product) {
      return res.status(422).json(
        { err:
          { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
        },
      ); 
    }
  });
  
  next();
};
const validateProductSaleQuantity = async (req, res, next) => {
  const saleItems = req.body;

  saleItems.forEach(async (element) => {
    const { code, message } = validateQuantitySchema(element.quantity);

    if (message) {
      return res.status(code).json(
        { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
      );
    }

    const product = await ProductsModel.getProductById(element.productId);
    
    if (!product) {
      return res.status(422).json(
        { err:
          { code: 'invalid_data', message: 'Product not found' },
        },
      ); 
    }
  });
  
  next();
};

module.exports = {
  validateName,
  validateQuantity,
  validateNameExists,
  validateIdParams,
  validateIdProductExists,
  validateProductSaleQuantity,
};
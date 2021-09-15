// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const { ObjectId } = require('mongodb');
const { validateNameQuantity } = require('../schemas/productSchema');
const ProductsModel = require('../models/ProductsModel');

// Comments: Valida os argumentos passados como parâmetros e então se produto existe na base de dados 
const validatePostProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const { code, message } = validateNameQuantity({ name, quantity });

  if (message) return res.status(code).json({ err: { code: 'invalid_data', message } });

  const nameExists = await ProductsModel.findProductByName({ name });
  
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
const validateId = async (req, res, next) => {
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

module.exports = {
  validatePostProduct,
  validateId,
};
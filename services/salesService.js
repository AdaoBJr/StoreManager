const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const validations = require('../middlewares/validate');

const create = async (saleArray) => {
  // Buscamos um produto com o mesmo nome que desejamos criar
  // https://zellwk.com/blog/async-await-in-loops/
  const productsId = saleArray.map((sale) => ObjectId(sale.productId));
  await salesModel.productsExist(productsId);

  const isvalid = validations.validateSale(saleArray);

  if (isvalid) return isvalid;

  return salesModel.create(saleArray);
};

const getAll = async () => {
  // Solicitamos que o model realize a busca no banco
  const sales = await salesModel.getAll();
  // Caso nenhum autor seja encontrado, retornamos um objeto de erro.
  if (!sales) {
    return {
      number: 404,
      error: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  // Caso haja um autor com o ID informado, retornamos esse autor
  return sales;
};

const getById = async (id) => {
  // Solicitamos que o model realize a busca no banco
  const sale = await salesModel.getById(id);

  // Caso nenhum autor seja encontrado, retornamos um objeto de erro.
  if (!sale) {
    return {
      number: 404,
      error: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  // Caso haja um autor com o ID informado, retornamos esse autor
  return sale;
};

const update = async (id, productArray) => {
  // Buscamos um produto com o mesmo nome que desejamos criar
  const getSale = await getById(id);

  if (getSale.error) return getSale;
  
  const isvalid = validations.validateSale(productArray);

  if (isvalid) return isvalid;

  return salesModel.update(id, productArray);
};

const getForDelete = async (id) => {
  // Solicitamos que o model realize a busca no banco
  const sale = await salesModel.getById(id);

  // Caso nenhum autor seja encontrado, retornamos um objeto de erro.
  if (!sale) {
    return {
      number: 422,
      error: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }

  // Caso haja um autor com o ID informado, retornamos esse autor
  return sale;
};

const deleteOne = async (id) => {
  const getSale = await getForDelete(id);

  if (getSale.error) return getSale;

  salesModel.deleteOne(id);
  
  return getSale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
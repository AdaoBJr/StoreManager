const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const validations = require('../middlewares/validate');

const create = async (saleArray) => {
  // Buscamos um produto com o mesmo nome que desejamos criar
  // https://zellwk.com/blog/async-await-in-loops/
  const productsId = saleArray.map((sale) => ObjectId(sale.productId));
  await salesModel.productsExist(productsId);

  const isvalid = validations.validateSale(saleArray);
  // console.log(saleArray);

  if (isvalid) return isvalid;

  return salesModel.create(saleArray);
};

// const getAll = async () => productsModel.getAll();

// const getById = async (id) => {
//   // Solicitamos que o model realize a busca no banco
//   const product = await productsModel.getById(id);

//   // Caso nenhum autor seja encontrado, retornamos um objeto de erro.
//   if (!product) {
//     return {
//       number: 422,
//       error: {
//         code: 'invalid_data',
//         message: 'Wrong id format',
//       },
//     };
//   }

//   // Caso haja um autor com o ID informado, retornamos esse autor
//   return product;
// };

// const update = async (id, name, quantity) => {
//   // Buscamos um produto com o mesmo nome que desejamos criar
//   const getProduct = await getById(id);

//   if (getProduct.error) return getProduct;
  
//   const isvalid = validations.isValidated({ name, quantity });

//   if (isvalid) return isvalid;

//   return productsModel.update(id, name, quantity);
// };

// const deleteOne = async (id) => {
//   const getProduct = await getById(id);

//   if (getProduct.error) return getProduct;

//   productsModel.deleteOne(id);
  
//   return getProduct;
// };

module.exports = {
  // getAll,
  // getById,
  create,
  // update,
  // deleteOne,
};
const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const create = rescue(async (req, res, next) => {
  const productArray = req.body;
  
  const newSale = await salesService.create(productArray);
  // Caso haja erro na criação do autor, iniciamos o fluxo de erro
  if (newSale.error) return next(newSale);
  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // do novo Produto
  return res.status(200).json(newSale);
});

// const update = rescue(async (req, res, next) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
  
//   const updatedProduct = await productsService.update(id, name, quantity);
//   // Caso haja erro na criação do autor, iniciamos o fluxo de erro
//   if (updatedProduct.error) return next(updatedProduct);

//   // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
//   // do novo Produto
//   return res.status(200).json(updatedProduct);
// });

// const deleteOne = rescue(async (req, res, next) => {
//   const { id } = req.params;
  
//   const deleteProduct = await productsService.deleteOne(id);
//   // Caso haja erro na criação do autor, iniciamos o fluxo de erro
//   if (deleteProduct.error) return next(deleteProduct);

//   // Caso esteja tudo certo, retornamos o status 200 Ok, junto com as informações
//   // atualizadas do Produto
//   return res.status(200).json(deleteProduct);
// });

module.exports = {
  // getAll,
  // getById,
  create,
  // update,
  // deleteOne,
};
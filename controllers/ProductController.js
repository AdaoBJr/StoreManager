const StatusCodes = require('http-status-codes');
const ProductService = require('../services/ProductService');

// const create = async (req, res) => {
// const { name, quantity } = req.body;
//  const product = await ProductService.create({ name, quantity });
 
//  const { id } = product;
//  if (!product) {
//   return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Dados inválidos' }); 
// }
//  return res.status(StatusCodes.CREATED).json({ id, name, quantity });
// };

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { id, code, message } = await ProductService.create(name, quantity);

  if (message) { 
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ err: { code, message } }); 
}
  res.status(code).json({ _id: id, name, quantity });
};

// Router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
  
//   await ProductService.update(id, name, quantity);

//   res.status(StatusCodes.NO_CONTENT).end();

module.exports = { create };
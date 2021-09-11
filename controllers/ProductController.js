const ProductService = require('../services/ProductService');

const UNPROCESSABLE_ENTITY = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { id, code, message } = await ProductService.create(name, quantity);

  if (message) { 
    return res.status(UNPROCESSABLE_ENTITY)
    .json({ err: { code, message } }); 
}
  return res.status(code).json({ _id: id, name, quantity });
};

// const getAll = async (_req, res) => {
//   const products = await ProductService.getAll();

//   res.status(200)
//     .json(products);
// };

module.exports = {
  create,
  // getAll,
}; 
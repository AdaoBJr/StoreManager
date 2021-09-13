const productService = require('../services/productServices');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const responseObj = await productService.createProduct(name, quantity);
  const { id } = responseObj;
  
  if (responseObj.err) {
    return res.status(422).json(responseObj);
  }
  
  return res.status(201).json({ _id: id, name: responseObj.name, quantity: responseObj.quantity });
};

// const getAll = async (_req, res) => {
//   const a = await productService.getAll;
//   console.log(a);
//   return res.status(200).json(a);
// };

module.exports = {
  createProduct,
  // getAll,
};
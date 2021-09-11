const ProductService = require('../services/ProductService');

const UNPROCESSABLE_ENTITY = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { id, code, message } = await ProductService.create(name, quantity);

  if (message) { 
    return res.status(UNPROCESSABLE_ENTITY)
    .json({ err: { code, message } }); 
}
  res.status(code).json({ _id: id, name, quantity });
};

module.exports = { create }; 
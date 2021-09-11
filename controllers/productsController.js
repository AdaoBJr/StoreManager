const productsService = require('../services/productsService');

const OK_STATUS = 200;
// const CREATED = 201;
const UNPROCESSABLE = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  console.log(req.body);
  
  const { id, code, message } = await productsService
    .create(name, quantity);
  
  if (message) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code,
        message,
      },
    });
  }
  return res.status(code).json({
    _id: id,
    name,
    quantity,
  });
};

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  res.status(OK_STATUS).json(products);
};

module.exports = {
  create,
  getAll,
};
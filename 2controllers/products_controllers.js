const { createproducts } = require('../3services/product_services');

const STATUS_OK = 201;
const createproduct = async (req, res) => {
  const { name, quantity } = req.body;
  const answer = await createproducts(name, quantity);
  if (answer.err) { return res.status(422).json(answer); }
  return res.status(STATUS_OK).json(answer);
};

module.exports = {
  createproduct,
};

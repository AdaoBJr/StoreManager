const { createproducts, showProductsService } = require('../3services/product_services');

const STATUS_OK = 201;
const createproduct = async (req, res) => {
  const { name, quantity } = req.body;
  const answer = await createproducts(name, quantity);
  if (answer.err) { return res.status(422).json(answer); }
  return res.status(STATUS_OK).json(answer);
};

const showProducts = async (req, res) => {
  const { id } = req.params;
  const answer = await showProductsService(id);
  if (answer === 422) {
 return res.status(answer)
    .json({ err: { code: 'invalid_data', message: 'Wrong id format' } }); 
}
  return res.status(200).json(answer);
};

module.exports = {
  createproduct,
  showProducts,
};

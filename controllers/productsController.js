const productsService = require('../services/productsService');

const registerNewProduct = async (req, res) => {
  const newProduct = req.body;
  const newRegister = await productsService.registerNewProduct(newProduct);
  if (newRegister.err) {
    return res.status(422).json(newRegister);
  }
  res.status(200).json(newRegister);
};

module.exports = {
  registerNewProduct,
};

const { createProduct, receiveProductsList } = require('../Services/Products');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await createProduct(name, quantity);

  if (product === true) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  return res.status(201).json(product);
};

const listAllProducts = async (_req, res) => {
  const fullProductList = await receiveProductsList();
  
  return res.status(200).json({ products: fullProductList });
};

module.exports = {
  addProduct,
  listAllProducts,
};

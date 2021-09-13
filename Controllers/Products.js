const Product = require('../Services/Products');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await Product.createProduct(name, quantity);

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

module.exports = {
  addProduct,
};

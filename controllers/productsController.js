const { servCreateProduct } = require('../services/productService');

const contCreateProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const result = await servCreateProduct(name, quantity);
    if (result.err) {
      return res.status(result.code).json({ ...result });
    }
 return res.status(result.code).json(result.prod);
};

module.exports = {
  contCreateProduct,
};
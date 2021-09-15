const productService = require('../services/productService');

const getAll = async (req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(422).json({
      err: {
        code: error.code,
        message: error.message,
      },
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

    const product = await productService.getById(id);
    if (product !== null) { return res.status(200).json(product); }

    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
  });
};
module.exports = {
  getAll,
  getById,
};
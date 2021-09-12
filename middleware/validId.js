// const product = require('../models/products');

const isValidId = async (req, res, next) => {
  const { id } = req.params;

  // const checkId = await product.getProductById(id);

  if (!id || id.length < 24 || id === null) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        },
      });
    }
    next();
};
module.exports = { isValidId };

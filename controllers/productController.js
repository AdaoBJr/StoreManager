const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.create({ name, quantity });
if (newProduct.err) {
  return res.status(422).json(newProduct);
}
return res.status(201).json(newProduct);
};

const getAll = async (req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json({ products });
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

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try { 
    const result = await productService.update({ name, quantity, id }); 
    if (result.err) {
      return res.status(422).json(result);
    }
    return res.status(200).json(result);
} catch (error) {
    return res.status(422).json({
      err: {
        code: error.code,
        message: error.message,
      },
    });
  }
};
module.exports = {
  getAll,
  getById,
  create,
  update,
};
const services = require('../services/products');

const getAll = async (_req, res) => {
  try {
    const products = await services.getAll();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await services.getById(id);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
};

const create = async (req, res) => {
  try {
    const product = req.body;

    const newProduct = await services.create(product);

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(error.err.status)
      .json({ err: { code: error.err.code, message: error.err.message } });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await services.update(id, name, quantity);

    return res.status(200).json({ _id: id, name, quantity });
  } catch (error) {
    return res.status(error.err.status)
    .json({ err: { code: error.err.code, message: error.err.message } });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await services.remove(id);

    return res.status(200).json(deletedProduct);
  } catch (error) {
    if (error.err) {
      return res.status(error.err.status)
        .json({ err: { code: error.err.code, message: error.err.message } });
    }
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
};

module.exports = { getAll, getById, create, update, remove };

const services = require('../services/sales');

const getAll = async (_req, res) => {
  try {
    const sales = await services.getAll();

    return res.status(200).json({ sales });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await services.getById(id);

    return res.status(200).json(service);
  } catch (error) {
    if (error.err) {
      return res.status(error.err.status)
        .json({ err: { code: error.err.code, message: error.err.message } });
    }
    return res.status(404)
      .json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
};

const create = async (req, res) => {
  try {
    const sales = req.body;

    const service = await services.create(sales);

    return res.status(200).json(service);
  } catch (error) {
    if (error.err) {
      return res.status(error.err.status)
        .json({ err: { code: error.err.code, message: error.err.message } });
    }
    return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = req.body;

    await services.update(id, sales);

    return res.status(200).json({ _id: id, itensSold: sales });
  } catch (error) {
    if (error.err) {
      return res.status(error.err.status)
        .json({ err: { code: error.err.code, message: error.err.message } });
    }
    return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await services.remove(id);

    return res.status(200).json(service);
  } catch (error) {
    if (error.err) {
      return res.status(error.err.status)
        .json({ err: { code: error.err.code, message: error.err.message } });
    }
    return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
};

module.exports = { getAll, getById, create, update, remove };

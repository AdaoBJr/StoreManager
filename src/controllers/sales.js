const services = require('../services/sales');

const getAll = async (_req, res) => {
  try {
    const service = await services.getAll();

    return res.status(200).json(service);
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
    return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  try {
    const service = await services.create();

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await services.update(id);

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await services.remove(id);

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getAll, getById, create, update, remove };

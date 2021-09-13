const SalesModel = require('../models/salesModel');

const create = async ({ itensSold }) => {
  const { id } = await SalesModel.create({ itensSold });
  return { id };
};

const getAll = async () => {
  const { sales } = await SalesModel
  .getAll();

return { sales };
};

const findById = async ({ id }) => {
  const { sale } = await SalesModel
  .findById({ id });

  return { sale };
};

const update = async ({ id, itensSold }) => {
  await SalesModel.update({ id, itensSold });
};

const deleteSale = async ({ id }) => {
  const { sale } = await SalesModel.deleteSale({ id });

  return { sale };
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteSale,
};
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
  await SalesModel
  .update({ id, itensSold });
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};
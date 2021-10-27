// Importação do salesModel
const salesModel = require('../models/salesModel');

// Realiza o cadstro de uma nova venda
const create = async (productsArray) => {
  // Chama o salesModel para realizar a criação
  const result = await salesModel.create(productsArray);
  // Retorna o resultado
  return result;
};

const getAll = async () => {
  // Chama o salesModel para realizar a listagem
  const result = await salesModel.getAll();
  // Retorna o resultado
  return result;
};

const getById = async (id) => {
  // Chama o salesModel para realizar a busca pelo id
  const result = await salesModel.getById(id);
  // Retorna o resultado
  return result;
};

const update = async (id, sale) => {
  // Chama o salesModel para realizar a atualização
  const result = await salesModel.update(id, sale);
  // Retorna o resultado
  return result;
};

const deleteById = async (id) => {
  // Chama o salesModel para realizar a exclusão
  const result = await salesModel.deleteById(id);
  // Retorna o resultado
  return result;
};

// Exportação padrão
module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};

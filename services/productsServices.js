// Importação do productsModel
const productsModel = require('../models/productsModel');

// Realiza a criação de um produto
const create = async (name, quantity) => {
  // Utiliza os parâmetros passados para criar um produto chamando o model
  const result = productsModel.create(name, quantity);
  // Retorna o resultado do model
  return result;
};

// Realiza a busca de um produto pelo nome
const findByName = async (name) => {
  // Utiliza os parâmetros passados para buscar um produto chamando o model
  const result = await productsModel.findByName(name);
  // Retorna o resultado do model
  return result;
};

// Realiza a listagem de todos os produtos
const getAll = async () => {
  // Utiliza os parâmetros passados para listar todos os produtos chamando o model
  const result = await productsModel.getAll();
  // Retorna o resultado do model
  return result;
};

// Realiza a busca de um produto pelo id
const getById = async (id) => {
  // Utiliza os parâmetros passados para buscar um produto pelo id chamando o model
  const result = await productsModel.getById(id);
  // Retorna o resultado do model
  return result;
};

// Atualiza um produto pelo id
const updateById = async (id, name, quantity) => {
  // Utiliza os parâmetros passados para atualizar um produto pelo id chamando o model
  const result = await productsModel.updateById(id, name, quantity);
  // Retorna o resultado do model
  return result;
};

// Deleta um produto pelo id
const deleteById = async (id) => {
  // Utiliza os parâmetros passados para deletar um produto pelo id chamando o model
  const result = await productsModel.deleteById(id);
  // Retorna o resultado do model
  return result;
};

// Realiza a subtração de um produto em estoque
const subtractProductsQuantity = async (entry) => {
  // Pega o id e a quantity para realizar a subtração
  const { productId, quantity } = entry;
  // Utiliza os parâmetros passados para atualizar a quantidade de um produto pelo id chamando o model
  const result = productsModel.subtractProductsQuantity(productId, quantity);
  // Retorna o resultado do model
  return result;
};

// Realiza a adição de um produto em estoque
const addProductsQuantity = async (entry) => {
  // Pega o id e a quantity para realizar a adição
  const { productId, quantity } = entry;
  // Utiliza os parâmetros passados para atualizar a quantidade de um produto pelo id chamando o model
  const result = productsModel.addProductsQuantity(productId, quantity);
  // Retorna o resultado do model
  return result;
};

// Exportação padrão das funções
module.exports = {
  create,
  findByName,
  getAll,
  getById,
  updateById,
  deleteById,
  subtractProductsQuantity,
  addProductsQuantity,
};

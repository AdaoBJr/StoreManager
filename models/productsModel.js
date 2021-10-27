// Importação do ObjectID do mongodb
const { ObjectID } = require('mongodb');
// Importação da connection
const { getConnection } = require('./connection');

// Realiza a criação de um produto
const create = async (name, quantity) => {
  // Realiza a conexão com o DB na collection de produtos
  const productsCollection = await getConnection().then((db) => db.collection('products'));
  // Realiza a inserção do produto na collection
  const response = await productsCollection.insertOne({ name, quantity });
  // Retorna o produto inserido com o id gerado
  return {
    _id: response.insertedId,
    name,
    quantity,
  };
};

// Realiza a busca de um produto pelo nome
const findByName = async (name) => {
  // Realiza a conexão com o DB na collection de produtos
  const productsCollection = await getConnection().then((db) => db.collection('products'));
  // Realiza a busca de um produto cadastrado com o nome informado
  const result = await productsCollection.findOne({ name });
  // Retorna o resultado da busca
  return result;
};

// Realiza a listagem de todos os produtos
const getAll = async () => {
  // Realiza a conexão com o DB na collection de produtos
  const productsCollection = await getConnection().then((db) => db.collection('products'));
  // Realiza a busca de todos os produtos cadastrados e pega em forma de Array
  const products = await productsCollection.find().toArray();
  // Retorna a lista de produtos
  return { products };
};

// Realiza a busca de um produto pelo id
const getById = async (id) => {
  // Realiza a conexão com o DB na collection de produtos
  const productsCollection = await getConnection().then((db) => db.collection('products'));
  // Realiza a busca de um produto com o id correspondente
  const response = await productsCollection.findOne(new ObjectID(id));
  // Retorna o produto encontrado
  return response;
};

// Realiza a atualização de um produto pelo id
const updateById = async (id, name, quantity) => {
  // Realiza a conexão com o DB na collection de produtos
  const productsCollection = await getConnection().then((db) => db.collection('products'));
  // Realiza o update do produto passando o novo name e quantity
  try {
    const response = await productsCollection.updateOne(
      { _id: id },
      { $set: { name, quantity } },
    );
    // Retorna a resposta
    return response;
  } catch (err) {
    // Retorna o erro caso aconteça
    return err;
  }
};

// Deleta um produto pelo id
const deleteById = async (id) => {
  // Realiza a conexão com o DB na collection de produtos
  const productsCollection = await getConnection().then((db) => db.collection('products'));

  try {
    // Deleta o produto com o id informado
    const deleted = await productsCollection.deleteOne({ _id: new ObjectID(id) });
    // Retorna o resultado da exclusão
    return deleted;
  } catch (err) {
    // Retorna o erro caso aconteça
    return err;
  }
};

// Realiza a subtração na quantidade de um produto
const subtractProductsQuantity = async (id, quantity) => {
  // Realiza a conexão com o DB na collection de produtos
  const productsCollection = await getConnection().then((db) => db.collection('products'));
  // Busca o produto para guardar sua quantity
  const oldValue = await productsCollection.findOne(new ObjectID(id));
  // Atualiza a quantidade do produto subtraindo o que foi passado
  const response = await productsCollection.updateOne(
    { _id: new ObjectID(id) },
    { $set: { quantity: (oldValue.quantity - quantity) } },
  );
  // Busca o produto para guardar sua nova quantity
  const newValue = await productsCollection.findOne(new ObjectID(id));
  // Verifica o resultado da resposta e retorna a nova quantidade
  if (response) { return newValue.quantity; }
  // Retorno caso algo deu errado
  return false;
};

// Realiza a adição na quantidade de um produto
const addProductsQuantity = async (id, quantity) => {
  // Realiza a conexão com o DB na collection de produtos
  const productsCollection = await getConnection().then((db) => db.collection('products'));

  try {
    // Busca o produto para guardar sua quantity
    const oldValue = await productsCollection.findOne(new ObjectID(id));
    // Atualiza a quantidade do produto adicionando o que foi passado
    const response = await productsCollection.updateOne(
      { _id: new ObjectID(id) },
      { $set: { quantity: oldValue.quantity + quantity } },
    );
    // Retorna a resposta com o novo valor
    return response;
  } catch (err) {
    // Retorno caso algo deu errado
    return err;
  }
};

// Exportação padrão
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

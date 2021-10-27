// Importação do ObjetcID
const { ObjectID } = require('mongodb');
// Importação da conexão
const { getConnection } = require('./connection');

// Realiza a criação de uma nova venda
const create = async (productsArray) => {
  // Realiza a conexão com o DB na collection de vendas
  const salesCollection = await getConnection().then((db) => db.collection('sales'));
  // Insere a nova venda no DB
  const { insertedId: _id } = await salesCollection.insertOne({ itensSold: productsArray });

  // Retorna resultado da criação
  return {
    _id,
    itensSold: productsArray,
  };
};

// Realiza a listagem das vendas
const getAll = async () => {
  // Realiza a conexão com o DB na collection de vendas
  const salesCollection = await getConnection().then((db) => db.collection('sales'));
  // Realiza a busca das vendas
  const response = await salesCollection.find().toArray();
  // Retorna a lista de vendas
  return { sales: response };
};

// Realiza a busca de uma venda pelo id
const getById = async (id) => {
  // Realiza a conexão com o DB na collection de vendas
  const salesCollection = await getConnection().then((db) => db.collection('sales'));
   // Realiza a busca da venda pelo id
  const response = await salesCollection.findOne(new ObjectID(id));
  // Retorna a resposta
  return response;
};

// Realiza a atualização de uma venda
const update = async (id, sale) => {
  // Realiza a conexão com o DB na collection de vendas
  const salesCollection = await getConnection().then((db) => db.collection('sales'));
  // Realiza a atualização da venda
  const response = await salesCollection.updateOne(
    { _id: new ObjectID(id) },
    { $set: { itensSold: sale } },
  );
  // Retorna a resposta
  return response;
};

// Realiza a exclusão de uma venda
const deleteById = async (id) => {
  // Realiza a conexão com o DB na collection de vendas
  const salesCollection = await getConnection().then((db) => db.collection('sales'));

  try {
    // Deleta a venda com o id informado
    const deleted = await salesCollection.deleteOne({ _id: new ObjectID(id) });
    // Retorna a mensagem
    return deleted;
    // Tratamento de erros
  } catch (err) {
    // Retorno do erro
    return err;
  }
};

// Exportação padrão
module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};

const connection = require('./produtoConnection');
// const { ObjectId } = require('mongodb');

const buscaProduto = async (name) => {
  const db = await connection();
  const produtoInserido = await db.collection('products').findOne({ name });

  return produtoInserido !== null ? produtoInserido : false;
};

const cadastrarProdutoModel = async ({ name, quantity }) => {
  const db = await connection();
  const produtoInserido = await db.collection('products').insertOne({ name, quantity });

  return { _id: produtoInserido.insertedId, name, quantity };
};

module.exports = { cadastrarProdutoModel, buscaProduto };
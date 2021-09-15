const { ObjectId } = require('mongodb');
const connection = require('./produtoConnection');

const buscaProdutoPorNome = async (name) => {
  const db = await connection();
  const produtoInserido = await db.collection('products').findOne({ name });

  return produtoInserido !== null ? produtoInserido : false;
};

const buscarTodosProdutoModel = async () => {
  const db = await connection();
  const todosProdutos = await db.collection('products').find().toArray();
  
  return { products: todosProdutos };
};

const buscarProdutoPorIDModel = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  const todosProdutos = await db.collection('products').findOne({ _id: ObjectId(id) });
  
  return todosProdutos !== null ? todosProdutos : false;
};

const cadastrarProdutoModel = async ({ name, quantity }) => {
  const db = await connection();
  const produtoInserido = await db.collection('products').insertOne({ name, quantity });

  return { _id: produtoInserido.insertedId, name, quantity };
};

module.exports = { 
cadastrarProdutoModel, 
buscaProdutoPorNome, 
buscarTodosProdutoModel,
buscarProdutoPorIDModel,
};
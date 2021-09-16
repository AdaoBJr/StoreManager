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
  const produto = await db.collection('products').findOne({ _id: ObjectId(id) });
  
  return produto !== null ? produto : false;
};

const cadastrarProdutoModel = async (name, quantity) => {
  const db = await connection();
  const produtoInserido = await db.collection('products').insertOne({ name, quantity });

  return { _id: produtoInserido.insertedId, name, quantity };
};

const atualizarProdutoModel = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return false;
  
  const db = await connection();

  const produtoInserido = await db.collection('products').update(
    { _id: new ObjectId(id) }, { $set: { name, quantity } },
  );
  console.log(`produtoInserido: ${produtoInserido}`);

  return { id, name, quantity };
};

const deleteProdutoModel = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  const produtoDeletado = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  console.log(`produtoDeletado: ${produtoDeletado}`);
  
  return produtoDeletado;
};

const cadastrarVendaModel = async ({ itensSold: arrayVendas }) => {
  const db = await connection();
  const vendaInserida = await db.collection('sales').insertOne({ itensSold: arrayVendas });

  return { _id: vendaInserida.insertedId, itensSold: arrayVendas };
};

const buscarVendaIDModel = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  const venda = await db.collection('sales').findOne({ _id: ObjectId(id) });
  
  return venda !== null ? venda : false;
};

const buscarTodasVendaModel = async () => {
  const db = await connection();
  const todosProdutos = await db.collection('sales').find().toArray();
  
  return { sales: todosProdutos };
};

module.exports = { 
cadastrarProdutoModel, 
buscaProdutoPorNome, 
buscarTodosProdutoModel,
buscarProdutoPorIDModel,
atualizarProdutoModel,
deleteProdutoModel,
cadastrarVendaModel,
buscarVendaIDModel,
buscarTodasVendaModel,
};
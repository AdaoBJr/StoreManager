// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-model/69147096-f19d-4ab4-a839-906359d79172/conteudos/cd21cca9-fe98-4c01-8db7-07afe515391f/model-com-mongodb/33efad68-1b11-4c09-a2a2-edb977033f95?use_case=side_bar

const { ObjectId } = require('mongodb'); 
const { connection } = require('./connection');

// ------------------------------------------------------------------
// Requisito 1: MODEL responsável por verificar a existência de um produto de NAME específico na BASE DE DADOS

// Ajuda: Matheus Gois
const findProductByName = async (name) => connection()
    .then((db) => db.collection('products').findOne({ name }));

// Requisito 1: MODEL responsável pelo cadastro de produtos na BASE DE DADOS e realizar o retorno do item cadastrado

// Comment: Parâmetros recebidos/passados como objeto {}, para que a ordem não interfira no funcionamento: Boa pŕatica by Zambis.
const postProducts = async ({ name, quantity }) => connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

// ------------------------------------------------------------------
// Requisito 2: MODEL responsável por retornar todos os produtos cadastrados na BASE DE DADOS

const getProducts = async () => connection()
    .then((db) => db.collection('products').find({}).toArray());

// Requisito 2: MODEL responsável por retornar produto filtrador por ID na BASE DE DADOS

const getProductById = async (id) => connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }))
    .then((result) => result);

// ------------------------------------------------------------------
// Requisito 3: MODEL responsável por atualizar e retornar produto atualizado por ID na BASE DE DADOS

const putProductById = async ({ id, name, quantity }) => connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    ))
    .then(() => ({ _id: id, name, quantity }));

// ------------------------------------------------------------------
// Requisito 4: MODEL responsável por deletar produto por ID na BASE DE DADOS

// Source: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndDelete/
const deleteProductById = async (id) => connection()
    .then((db) => db.collection('products').findOneAndDelete({ _id: ObjectId(id) }))
    .then(({ value: { name, quantity } }) => ({ _id: id, name, quantity }));

// ------------------------------------------------------------------

module.exports = {
  postProducts,
  findProductByName,
  getProducts,
  getProductById,
  putProductById,
  deleteProductById,
};

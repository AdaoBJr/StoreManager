// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-model/69147096-f19d-4ab4-a839-906359d79172/conteudos/cd21cca9-fe98-4c01-8db7-07afe515391f/model-com-mongodb/33efad68-1b11-4c09-a2a2-edb977033f95?use_case=side_bar

const { ObjectId } = require('mongodb'); 
const { connection } = require('./connection');

// ------------------------------------------------------------------
// Requisito 5: MODEL responsável pelo cadastro de vendas na BASE DE DADOS e realizar o retorno do item cadastrado

const postSales = async (saleItems) => connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: saleItems }))
    .then((result) => ({ _id: result.insertedId, itensSold: saleItems }));

// ------------------------------------------------------------------
// Requisito 6: MODEL responsável por retornar todos as vendas cadastradas na BASE DE DADOS

const getSales = async () => connection()
    .then((db) => db.collection('sales').find({}).toArray());

// Requisito 6: MODEL responsável por retornar venda filtrada por ID na BASE DE DADOS

const getSalesById = async (id) => connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }))
    .then((result) => result);

// // ------------------------------------------------------------------
// // Requisito 7: MODEL responsável por atualizar e retornar produto atualizado por ID na BASE DE DADOS

// const putProductById = async ({ id, name, quantity }) => connection()
//     .then((db) => db.collection('products').updateOne(
//       { _id: ObjectId(id) },
//       { $set: { name, quantity } },
//     ))
//     .then(() => ({ _id: id, name, quantity }));

// ------------------------------------------------------------------
// Requisito 4: MODEL responsável por deletar produto por ID na BASE DE DADOS

// // Source: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndDelete/
// const deleteProductById = async (id) => connection()
//     .then((db) => db.collection('products').findOneAndDelete({ _id: ObjectId(id) }))
//     .then(({ value: { name, quantity } }) => ({ _id: id, name, quantity }));

// ------------------------------------------------------------------

module.exports = {
  postSales,
  getSales,
  getSalesById,
};

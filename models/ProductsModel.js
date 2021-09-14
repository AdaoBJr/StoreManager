// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-model/69147096-f19d-4ab4-a839-906359d79172/conteudos/cd21cca9-fe98-4c01-8db7-07afe515391f/model-com-mongodb/33efad68-1b11-4c09-a2a2-edb977033f95?use_case=side_bar

// const { ObjectId } = require('mongodb'); // Comment: Método de validação do ID na base de dados MongoDB
const { connection } = require('./connection');

// ------------------------------------------------------------------
// Requisito 1: MODEL responsável por verificar a existência de um produto de NAME específico na BASE DE DADOS

// Ajuda: Matheus Gois
const findProductByName = async ({ name }) => connection()
    .then((db) => db.collection('products').findOne({ name }));

// ------------------------------------------------------------------
// Requisito 1: MODEL responsável pelo cadastro de produtos na BASE DE DADOS e realizar o retorno do item cadastrado

// Comment: Parâmetros recebidos/passados como objeto {}, para que a ordem não interfira no funcionamento: Boa pŕatica by Zambis.
const postProducts = async ({ name, quantity }) => connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ id: result.insertedId, name, quantity }));

// ------------------------------------------------------------------

module.exports = {
  postProducts,
  findProductByName,
};

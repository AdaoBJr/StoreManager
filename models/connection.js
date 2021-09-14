// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-model/69147096-f19d-4ab4-a839-906359d79172/conteudos/cd21cca9-fe98-4c01-8db7-07afe515391f/model-com-mongodb/33efad68-1b11-4c09-a2a2-edb977033f95?use_case=side_bar

const { MongoClient } = require('mongodb');

// Dados servidor para AVALIADOR
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

// Dados servidor para uso LOCAL
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let db = null;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db(DB_NAME);
    return db;
    }));

// Exportado entre {} para viabilizar o MOCH nomomento dos testes
module.exports = { connection };
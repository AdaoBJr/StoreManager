const { MongoClient } = require('mongodb');

// conexão com o banco
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// conexão para os testes
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

// conexão abaixo, comentar e descomentar acima para usar a conexão correta

const DB_NAME = 'StoreManager';
let db = null;

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const connection = async () => {
  if (!db) {
    const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = conn.db(DB_NAME);
    return db;
  }
  return Promise.resolve(db);
};

module.exports = connection;  
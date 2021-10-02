// hello-msc/models/connection.js
const { MongoClient } = require('mongodb');

require('dotenv').config();

// conexão com o banco para testes locais
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// conexão para os o github
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let db = null;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    }));

module.exports = connection;
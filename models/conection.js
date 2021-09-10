const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// para testes locais
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// para avaliador
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let db = null;

const connection = async () => {
  if (!db) {
    const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = conn.db(DB_NAME);
    return db;
  }
  return Promise.resolve(db);
};

module.exports = connection;
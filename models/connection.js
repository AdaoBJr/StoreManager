const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// conexão local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// conexão avaliador
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

function connection() {
  return MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      const db = conn.db(DB_NAME);
      return db;
    });
}

module.exports = connection;

const { MongoClient } = require('mongodb');

// A conexão do banco local deverá conter os seguintes parâmetros:
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// Para o avaliador funcionar altere a conexão do banco para:
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';


const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = () =>
  (
    db ? 
      Promise.resolve(db)
      : MongoClient.connect(MONGO_DB_URL, OPTIONS)
        .then((conn) => {
          db = conn.db(DB_NAME);
          return db;
        }));

module.exports = connection;

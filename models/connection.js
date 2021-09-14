const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';

// conexão com o banco local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// conexão com o avaliador
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

let schema = null;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = connection;

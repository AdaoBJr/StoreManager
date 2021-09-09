const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

let DB_NAME = 'StoreManager';

async function getConnection() {
  if (DB_NAME) return Promise.resolve(DB_NAME);
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('model_example'))
    .then((dbSchema) => {
      DB_NAME = dbSchema;
      return DB_NAME;
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { getConnection };
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

let bd = null;

const connection = () => {
  return db
  ? Promise.resolve(bd)
  : MongoClient.connection(MONGO_DB_URL, OPTIONS)
    .then((connect) => {
      db = connect.db(DB_NAME);
      return db;
    });
};

module.exports = connection;

const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
// const MONGO_DB_URL = `mongodb://mongodb:27017/${DB_NAME}`;
const MONGO_DB_URL = 'mongodb://localhost:27017/${DB_NAME}';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = async () => {
  db = db || await MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME));
  return db;
};

module.exports = connection;

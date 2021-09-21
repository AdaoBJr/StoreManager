const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

async function connect() {
  if (!db) {
    const connection = await MongoClient.connect(MONGO_DB_URL, options);
    db = connection.db(DB_NAME);
    return db;
  }

  return Promise.resolve(db);
}

module.exports = connect;
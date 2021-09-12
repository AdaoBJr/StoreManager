const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoURL = 'mongodb://mongodb:27017/StoreManager';

const MONGO_DB_URL = process.env.MONGO_CONN_URL || mongoURL;
const DB_NAME = 'StoreManager';

let db = null;

async function connection() {
  if (db) return Promise.resolve(db);
  return MongoClient
    .connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      db = dbSchema;
      return db;
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { connection };

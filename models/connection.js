const { MongoClient } = require('mongodb');
require('dotenv').config();

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = process.env.MONGO_DB_URL
|| 'mongodb://mongodb:27017/StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let schema = null;

function connection() {
  return schema ? Promise.resolve(schema) : (
    MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((mongo) => mongo.db(DB_NAME))
      .then((db) => {
        schema = db;
        return schema;
      })
      .catch((err) => console.error(err.message))
  );
}

module.exports = connection;

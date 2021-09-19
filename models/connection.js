require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

const OPTION = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connection = () => MongoClient
  .connect(MONGO_DB_URL, OPTION)
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;

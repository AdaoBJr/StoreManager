const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connection = () => MongoClient
    .connect(MONGO_DB_URL, options)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });

module.exports = {
  connection,
};

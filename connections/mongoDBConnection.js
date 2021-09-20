const { MongoClient } = require('mongodb');

// avaliador
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const DB_CONFIG = {
  userNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, DB_CONFIG)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

module.exports = connection;

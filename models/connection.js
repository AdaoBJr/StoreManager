const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// 'mongodb://localhost:27017/StoreManager';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db('StoreManager'))
    .catch((err) => {
      console.log(err);
      process.exit();
    });

  module.exports = connection;

const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.MONGO_DB_URL
|| 'mongodb://localhost:27017/StoreManager';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db('StoreManager'))
    .catch((err) => {
      console.log(err);
      process.exit();
    });

  module.exports = connection;

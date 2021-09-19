const { MongoClient } = require('mongodb');

// github
 const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const getConnection = () => MongoClient
    .connect(MONGO_DB_URL, {
      // urlNewParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME)) // nome do banco de dados
    .catch((err) => {
      console.error(err);
      process.exit();
    });

module.exports = {
  getConnection,
};
const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; // for github evaluator

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit();
    });

module.exports = connection;

// products : { "name": "Produto Silva", "quantity": 10 }
// sales : { "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }] }

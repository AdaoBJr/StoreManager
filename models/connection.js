// const { MongoClient } = require('mongodb');

// // conexão local---------------------
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// // const DB_NAME = 'StoreManager';

// // conexão avaliador--------------------
// // const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// // const DB_NAME = 'StoreManager';

// const OPTIONS = {
//     // useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

// let db = null;

// const connection = () => (db 
//     ? Promise.resolve(db)
//     : MongoClient.connect(MONGO_DB_URL, OPTIONS)
//     .then((conn) => {
//     db = conn.db(process.env.DB_DATABASE);
//     return db;
//     }));

// module.exports = connection;

const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () => MongoClient
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
    connection,
};
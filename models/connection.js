// Primeiramente devemos se conectar ao banco de dados

const { MongoClient } = require('mongodb'); // cliente mongo para o node

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let schema = null;

const connect = async () => {
   if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(MONGO_DB_URL, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
    });
  };

module.exports = { connect };
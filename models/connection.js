// Require para as informações do dotenv
require('dotenv').config();
// Importação do MongoClient
const { MongoClient } = require('mongodb');

// Definição da url do mongo
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/StoreManager';
// Definição do nome do DB
const DB_NAME = process.env.DB_NAME || 'StoreManager';
// Criação do schema
let schema = null;
// Função para conexão (padrão)
async function getConnection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
     // Definições padrão
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    // Tratamento de erros
    .catch((err) => {
      console.error(err);
    });
}
// Exportação padrão
module.exports = { getConnection };

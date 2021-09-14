const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

const getConnection = async () => {
  const connection = await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((conn) => conn.db(DB_NAME));
  return connection;
};

module.exports = { getConnection };

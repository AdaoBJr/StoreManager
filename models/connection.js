const { MongoClient } = require('mongodb');

let db = null;

const connection = () => {
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  const DB_NAME = 'StoreManager';
  // const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
  const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

  return db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
  .then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  });
};

module.exports = connection;
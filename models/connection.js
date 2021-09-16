const { MongoClient } = require('mongodb');

let MONGO_DB_URL;
if (process.env.CI === 'true') {
  MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
} else MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

let db;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  }));

module.exports = connection;

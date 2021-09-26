const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
 const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let db = null;

const connectionDb = () => (
  db ? Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, { seNewUrlParser: true,
    useUnifiedTopology: true }).then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    }));
    
module.exports = connectionDb;

const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let nulo = null;

const connectionDb = () => (
  nulo ? Promise.resolve(nulo) : MongoClient.connect(MONGO_DB_URL, { seNewUrlParser: true,
    useUnifiedTopology: true }).then((conn) => {
      nulo = conn.db(DB_NAME);
      return nulo;
    }));
    
module.exports = connectionDb;

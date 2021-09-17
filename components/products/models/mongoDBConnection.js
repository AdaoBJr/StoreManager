const { mongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

module.exports = () => mongoClient.connect(URL, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((conn) => {
    conn.db(DB_NAME);
  }).catch((err) => {
    console.log(err);
    process.exit(1);
  });

// require('dotenv').config();
// const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
// MONGO_DB_URL= 'mongodb://localhost:27017/StoreManager';

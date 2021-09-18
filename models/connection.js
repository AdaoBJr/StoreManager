const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';

const connection = () => mongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(process.env.DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = {
  connection,
};
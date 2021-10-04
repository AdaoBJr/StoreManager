const { MongoClient } = require('mongodb');

require('dotenv').config();

const MONGO_DB_URL = process.env.DB_URL || 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getConnection = async () => {
    const connection = await MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
    return connection;
};
      
module.exports = {
    getConnection,
};
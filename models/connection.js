const { MongoClient } = require('mongodb');

const MONGO_DB = 'mongodb://localhost:27017';
const NAME_DB = 'StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () =>
  MongoClient.connect(MONGO_DB, OPTIONS)
    .then((conn) => conn.db(NAME_DB));

module.exports = connection;
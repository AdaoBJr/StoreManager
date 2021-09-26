const { MongoClient } = require('mongodb');

const DB = {
  NAME: 'StoreManager',
  URL: 'mongodb://mongodb:27017/StoreManager',
};

const { DB_NAME } = process.env || DB.NAME;

const { DB_URL } = process.env || DB.URL;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function connection() {
  const client = MongoClient.connect(DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((error) => {
      console.error(error);

      return process.exit(1);
    });

  return client;
}

module.exports = connection;

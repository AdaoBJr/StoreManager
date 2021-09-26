const { MongoClient } = require('mongodb');

const { DB_URL_TESTS, DB_NAME } = process.env;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function connection() {
  const client = MongoClient.connect(DB_URL_TESTS, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((error) => {
      console.error(error);

      return process.exit(1);
    });

  return client;
}

module.exports = connection;

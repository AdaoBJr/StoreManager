const { MongoClient } = require('mongodb');

const URL = 'mongodb://mongodb:27017/StoreManager';

let schema = null;
async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db('StoreManager'))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
}

module.exports = connection;

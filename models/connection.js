const { MongoClient } = require('mongodb');

let db = null;
const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect('mongodb://localhost:27017/StoreManager', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((conn) => {
        db = conn.db('StoreManager');
        return db;
      })
      .catch((err) => {
        console.log(err);
        process.exit();
      }));

module.exports = connection;

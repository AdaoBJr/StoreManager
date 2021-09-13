const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// local
const MONGO_DB_URL = 'mongodb://mongodb:27017/';
const DB_NAME = 'StoreManager';

// Avaliador
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';

let db = null;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db(DB_NAME);
    return db;
    }));

module.exports = connection;
const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// local
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

// remoto
// const MONGOME = _DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NA'StoreManager';

let DB = null;

const connection = () => (DB ? Promise.resolve(DB)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    DB = conn.db(DB_NAME);
    return DB;
    }));

module.exports = connection;

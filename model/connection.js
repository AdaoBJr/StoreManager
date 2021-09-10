const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

/** CONEXÃO AVALIADOR LOCAL */
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

/** CONEXÃO AVALIADOR GITHUB */
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';

const connection = () => {
    let db;
    return db
        ? Promise.resolve(db)
        : MongoClient.connect(MONGO_DB_URL, OPTIONS)
            .then((conn) => {
                db = conn.db(DB_NAME);
                return db;
            })
            .catch((e) => {
                console.log(e);
                process.exit();
            });
};

module.exports = connection;
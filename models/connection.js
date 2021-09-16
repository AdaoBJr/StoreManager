const { MongoClient } = require('mongodb');

require('dotenv').config();

// Conexão feita com a ajuda do Henrique Clementino

const OPTIONS = {
useNewUrlParser: true,
useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

let db = null;

const connection = () => (db
? Promise.resolve(db)
: MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
db = conn.db(process.env.DB_NAME);
return db;
}));

module.exports = connection; 
const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

// db ? Promise.resolve(db)
//     : MongoClient.connect(MONGO_DB_URL, OPTIONS)
//                 .then((conn) => {
//                 db = conn.db(DB_NAME);
//                 return db;
//                 })

// const OPTIONS = {
//     userNewUrlParser: true,
//     useUniFiedTopology: true,
// };

// let db = null;

const connection = async () => 
    MongoClient
        .connect(MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((conn) => conn.db(DB_NAME))
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });

module.exports = connection;

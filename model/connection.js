const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.DB_URL || 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = process.env.DB_NAME || 'StoreManager';

const connection = async () => MongoClient
        .connect(MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((conn) => conn.db(DB_NAME))
        .catch((err) => {
            console.error(err);
        });

module.exports = connection;

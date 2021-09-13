// const { ObjectId } = require('mongodb');
const connect = require('./connect');

const create = async (itensSold) => {
    const out = await connect()
            .then((db) => db.collection('sales')
            .insertOne({ itensSold }))
            .then((result) => result.ops[0]);
        return out;
};

module.exports = { create };
const { ObjectId } = require('mongodb');
const connect = require('./connect');

const create = async (itensSold) => {
    const out = await connect()
            .then((db) => db.collection('sales')
            .insertOne({ itensSold }))
            .then((result) => result.ops[0]);
        return out;
};

const findAll = async () => connect()
    .then((db) => db.collection('sales')
    .find().toArray()).then((out) => (out));

const findByID = async (id) => connect()
    .then((db) => db.collection('sales')
    .findOne({ _id: ObjectId(id) })).then((out) => (out));

const update = async (id, itensSold) => connect()
    .then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) },
    { $set: { itensSold } }, { upsert: true })).then((out) => (out));

module.exports = { create, findAll, findByID, update };
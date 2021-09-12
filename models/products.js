const { ObjectId } = require('mongodb');
const connect = require('./connect');

const createOne = async (name, quantity) => {
        const out = await connect()
            .then((db) => db.collection('products')
            .insertOne({ name, quantity }))
            .then((result) => result.ops[0]);
        return out;
        };

const findByName = async (name) => connect()
            .then((db) => db.collection('products')
            .find({ name }).toArray()).then((out) => out);

const findById = async (id) => connect()
            .then((db) => db.collection('products')
            .findOne({ _id: id })).then((out) => out);

const findAll = async () => connect()
            .then((db) => db.collection('products')
            .find().toArray()).then((out) => (out));

const editOne = async (name, quantity, id) => connect()
            .then((db) => db.collection('products')
            .updateOne({ _id: new ObjectId(id) }, { $set: { name, quantity } }, { upsert: true }))
            .then((out) => (out));

const deleteOne = async (id) => {
    connect()
        .then((db) => db.collection('products')
        .deleteOne({ _id: new ObjectId(id) }))
        .then((out) => (out));
};

module.exports = {
    createOne,
    editOne,
    findByName,
    findById,
    findAll,
    deleteOne,
};
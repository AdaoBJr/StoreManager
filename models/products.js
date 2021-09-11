const connect = require('./connect');

const createOne = async (name, quantity) => connect()
            .then((db) => db.collection('products')
            .insertOne({ name, quantity }))
            .then((result) => result.ops[0]);

const findOne = async (name) => connect()
            .then((db) => db.collection('products')
            .findOne({ name })).then((out) => out);

module.exports = {
    createOne,
    findOne,
};
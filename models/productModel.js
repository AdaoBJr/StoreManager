const { ObjectId } = require('mongodb');
const connectionDB = require('./connection');

/* 
FOLLOWING CRUD
    |__ CREATE
    |__ READ
    |__ UPDATE
    |__ DELETE

*/

// EXIST NAME
const existName = async (name) => {
    const db = await connectionDB.connect();
    const product = await db.collection('products').findOne({ name });
    return product;
};

// EXIST ID
const existId = async (id) => {
    const db = await connectionDB.connect();
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    return product;
};

// READ
const getAll = async () => {
    const db = await connectionDB.connect();
    const products = await db.collection('products').find().toArray();
    return products;
};

// READ
const getId = async (id) => {
    const db = await connectionDB.connect();
    const productOne = await db.collection('products').findOne({ _id: ObjectId(id) });
    return productOne;
};

// CREATE
const add = async (name, quantity) => {
    const db = await connectionDB.connect();
    const product = await db.collection('products').insertOne({ name, quantity });
    return { _id: product.insertedId, name, quantity };
};

// UPDATE
const update = async (id, name, quantity) => {
    const db = await connectionDB.connect();
    await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return { _id: id, name, quantity };
};

// DELETE
const exclude = async (id) => {
    const db = await connectionDB.connect();
    const productFound = await db.collection('products').findOne({ _id: ObjectId(id) });
    await db.collection('products').deleteOne({ _id: ObjectId(id) });

    return productFound;
};

module.exports = { existName, existId, getId, getAll, add, update, exclude };
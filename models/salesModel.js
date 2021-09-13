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
    if (!ObjectId.isValid(id)) { return null; }
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
const add = async (salesArray) => {
    const db = await connectionDB.connect();
    const itensSold = salesArray;
    const sale = await db.collection('sales').insertOne({ itensSold });
    return { _id: sale.insertedId, itensSold };
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
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    await db.collection('products').deleteOne({ _id: ObjectId(id) });

    return product;
};

module.exports = { existName, existId, getId, getAll, add, update, exclude };
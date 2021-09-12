const connectionDB = require('./connection');
/* 
FOLLOWING CRUD
    |__ CREATE
    |__ READ
    |__ UPDATE
    |__ DELETE

*/

// EXIST 
const exist = async (name) => {
    const db = await connectionDB.connect();
    const product = await db.collection('products').findOne({ name });
    return product;
};

// READ
const getAll = async () => {
    const db = await connectionDB.connect();
    const products = await db.collection('products').find().toArray();
    return products;
};

// CREATE
const add = async (name, quantity) => {
    const db = await connectionDB.connect();
    const product = await db.collection('products').insertOne({ name, quantity });
    return { _id: product.insertedId, name, quantity };
};

// UPDATE
const update = async () => {};

// DELETE
const exclude = async () => {};

module.exports = { exist, getAll, add, update, exclude };
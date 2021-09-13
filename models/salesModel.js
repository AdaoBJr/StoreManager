const { ObjectId } = require('mongodb');
const connectionDB = require('./connection');

/* 
FOLLOWING CRUD
    |__ CREATE
    |__ READ
    |__ UPDATE
    |__ DELETE

*/

// EXIST ID
const existId = async (id) => {
    if (!ObjectId.isValid(id)) { return null; }
    const db = await connectionDB.connect();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return sale;
};

// READ
const getAll = async () => {
    const db = await connectionDB.connect();
    const sales = await db.collection('sales').find().toArray();
    return sales;
};

// READ
const getId = async (id) => {
    const db = await connectionDB.connect();
    const saleOne = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return saleOne;
};

// CREATE
const add = async (salesArray) => {
    const db = await connectionDB.connect();
    const itensSold = salesArray;
    const sale = await db.collection('sales').insertOne({ itensSold });
    return { _id: sale.insertedId, itensSold };
};

// UPDATE
const update = async (id, salesArray) => {
    // console.log(id, salesArray);
    const db = await connectionDB.connect();
    const itensSold = salesArray;
    await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
    return { _id: id, itensSold };
};

// DELETE
const exclude = async (id) => {
    const db = await connectionDB.connect();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    await db.collection('sales').deleteOne({ _id: ObjectId(id) });

    return sale;
};

module.exports = { existId, getId, getAll, add, update, exclude };
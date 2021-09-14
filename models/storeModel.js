const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async (name) => {
    const db = await connection();
    const product = await db.collection('products').findOne({ name });

    return product !== null;
};

const getAll = async () => {
    const db = await connection();
    return db.collection('products').find().toArray();
};

const create = async ({ name, quantity }) => {
    const db = await connection();
    const createdSoundResult = await db.collection('products').insertOne({ name, quantity });

    return { _id: createdSoundResult.insertedId, name, quantity };
};

const update = async ({ id, name, quantity }) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();

    const product = await db.collection('products').updateOne(
        { _id: ObjectId(id) }, { $set: { name, quantity } },
);
    return product;
};

const exclude = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();

    return db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = { getAll, create, update, exclude, productExists };
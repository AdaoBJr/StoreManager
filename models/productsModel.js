// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
    const db = await connection();
    const get = await db.collection('products').find().toArray();
    return get;
};

const productsExists = async (name) => {
    const db = await connection();
    const product = await db.collection('products').findOne({ name });

    return product !== null;
};

const create = async ({ name, quantity }) => {
    const db = await connection();
    const createdSoundResult = await db.collection('products').insertOne({ name, quantity });

    return { id: createdSoundResult.insertedId, name, quantity };
};

// const update = async ({ id, name, album }) => {
//     if (!ObjectId.isValid(id)) return null;
//     const db = await connection();

//     const song = await db.collection('songs').updateOne(
//         { _id: ObjectId(id) }, { $set: { name, album } });
//     return song;
// };

// const exclude = async (id) => {
//     if (!ObjectId.isValid(id)) return null;
//     const db = await connection();

//     return await db.collection('songs').deleteOne({ _id: ObjectId(id) });
// }

module.exports = { getAll, create, productsExists };
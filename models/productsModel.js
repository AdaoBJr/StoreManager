// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
    const db = await connection();
    const get = await db.collection('songs').find().toArray();
    return get;
};

const create = async ({ name, album }) => {
    const db = await connection();
    const createdSoundResult = await db.collection('songs').insertOne({ name, album });

    return { id: createdSoundResult.insertedId, name, album };
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

module.exports = { getAll, create };
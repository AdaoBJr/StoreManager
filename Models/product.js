const connection = require('./connections');

const create = async (name, quantity) => 
    connection()
        .then((db) => db.collection('products').insertOne({ name, quantity }))
        .then((result) => ({ _id: result.insertedId, name, quantity }));

const find = async (name) => {
    const product = await connection()
        .then((db) => db.collection('products').findOne({ name }));
    if (!product) return null;
    return product;
};

module.exports = {
    create,
    find,
};

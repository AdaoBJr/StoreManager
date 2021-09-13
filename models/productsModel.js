const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async (name) => {
    const db = await connection();
    const product = await db.collection('products').findOne({ name });

    return product !== null;
};

const productById = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const db = await connection();
    const productObj = await db.collection('products').findOne({ _id: ObjectId(id) });

    return productObj;
};

const getAll = async () => {
    const db = await connection();
    const products = await db.collection('products').find().toArray();
    return { products };
};

const create = async ({ name, quantity }) => {
    const db = await connection();
    const createdProductResult = await db.collection('products').insertOne({ name, quantity });

    return { _id: createdProductResult.insertedId, name, quantity };
};

const update = async ({ id, name, quantity }) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();

    await db.collection('products').updateOne(
        { _id: ObjectId(id) }, { $set: { name, quantity } },
    );
        
    return { id, name, quantity };
};

const exclude = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    const deletedProduct = await db.collection('products').findOne({ _id: ObjectId(id) });
    db.collection('products').deleteOne({ _id: ObjectId(id) });
    return deletedProduct;
};

module.exports = { getAll, create, update, exclude, productExists, productById };

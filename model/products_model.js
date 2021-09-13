const { ObjectId } = require('mongodb');
const connection = require('./connection');

const newProducts = async (name, quantity) => {
    const db = await connection();

    const product = await db.collection('products').insertOne({ name, quantity });
    
    // const { insertedId } = JSON.parse(product);

    return product.ops[0];
};

const listAllProducts = async () => {
    const db = await connection();
    // pegar os documento e colocar dentro do array
    const products = await db.collection('products').find().toArray();
    
    return products;
};

const listById = async (id) => {
    const db = await connection();
    const product = await db.collection('products').findOne(ObjectId(id));
    return product;
};

const updateById = async (id, name, quantity) => {
    const db = await connection();
    const product = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

    return product;
};

const deleteById = async (id) => {
    const db = await connection();
     const product = await listById(id);
    await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    return product;
};

module.exports = {
    newProducts,
    listAllProducts,
    listById,
    updateById,
    deleteById,
};
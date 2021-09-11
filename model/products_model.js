// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const newProducts = async (name, quantity) => {
    const db = await connection();

    const product = await db.collection('products').insertOne({ name, quantity });
    
    // const { insertedId } = JSON.parse(product);

    return product.ops[0];
};

module.exports = {
    newProducts,
};
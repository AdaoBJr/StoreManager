const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (itensSold) => {
    const db = await connection();

    const sale = await db.collection('sales').insertOne({ itensSold });
    const { insertedId } = sale;
    
   // console.log(sale, 'model');

    return { _id: insertedId, itensSold };
};

const listSales = async () => {
    const db = await connection();

    const sales = await db.collection('sales').find().toArray();
    // console.log(sales[0]);
     return sales;
};

const listById = async (id) => {
    const db = await connection();
    const product = await db.collection('sales').findOne(ObjectId(id));
    if (!product) return null;
    return product;
};

const updateById = async (id, productId, quantity) => {
    const db = await connection();
    const product = await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } });

    return product;
};

const deleteById = async (id) => {
    const db = await connection();
     const product = await listById(id);
    await db.collection('sales').deleteOne({ _id: ObjectId(id) });
    return product;
};

module.exports = {
    createSales,
    listSales,
    listById,
    updateById,
    deleteById,
};
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
    return product;
};

module.exports = {
    createSales,
    listSales,
    listById,
};
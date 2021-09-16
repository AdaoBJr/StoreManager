const { ObjectId } = require('mongodb');
const connection = require('./connections');

const addSale = async (products) => {
    const db = await connection();
    const sale = await db.collection('sales').insertOne({ itensSold: products,
     });

    return sale.ops[0];
};

const findAllSales = async () => {
    const db = await connection();
    const sales = await db.collection('sales').find().toArray();
    return sales;
};

const findSaleById = async (id) => {
    const db = await connection();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return sale;
};

const updateSaleByid = async (id, productsSoldOut) => {
    const db = await connection();
    const saleAfterUpdate = await db.collection('sales').updateOne({ _id: ObjectId(id) }, { 
        $set: productsSoldOut,
        
     });
    return saleAfterUpdate;
};

const deleteSaleByid = async (id) => {
    const db = await connection();
   await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
    addSale,
    findAllSales,
    findSaleById,
    updateSaleByid,
    deleteSaleByid,
};
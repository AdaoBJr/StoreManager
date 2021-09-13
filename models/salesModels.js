// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createSale = async (body) => {
  const db = await mongoConnection.getConnection();
  const sales = await db.collection('sales').insertOne({ itensSold: body });
  console.log(sales);
  return {
    _id: sales.insertedId,
    itensSold: body,
  };
};

module.exports = { 
  createSale,
 };

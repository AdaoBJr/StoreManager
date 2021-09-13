// const { ObjectId } = require('mongodb');
const Connection = require('./connection');

const createSale = async ({ productId, quantity }) => {
  const salesCollection = await Connection.getConnection()
    .then((db) => db.collection('sales'));
    
    const { insertedId: id } = await salesCollection
    .insertOne({ productId, quantity });
    
    return {
      id,
      productId,
      quantity,
    };
  };
  
module.exports = {
  createSale,
};

const mongoConnection = require('./connection');

const getConnectionWithSalesCollection = async () => {
  const connnectionWithSalesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

  return connnectionWithSalesCollection;
};

const create = async (itensSold) => {
  const salesCollection = await getConnectionWithSalesCollection();
  
  const { insertedId: _id } = await salesCollection
    .insertOne({ itensSold });
  
  return {
    _id,
    itensSold,
  };
};

const findAll = async () => {
  const salesCollection = await getConnectionWithSalesCollection();
  const sales = await salesCollection.find().toArray();

  return sales;
};

module.exports = { create, findAll };
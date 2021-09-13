const Connection = require('./connection');

const createSale = async (body) => {
  const salesCollection = await Connection.getConnection()
    .then((db) => db.collection('sales'));
    
    const sold = body;
    // console.log(sold);

    const sale = await salesCollection.insertOne({ sold });
    console.log(sale, 'Sale do Model');

    return { _id: sale.insertedId, sold };    
  };

  const getAllSales = async () => {
  const salesCollection = await Connection.getConnection()
    .then((db) => db.collection('sales'));

    const sales = await salesCollection.find().toArray();
    
    return sales;
  };

module.exports = {
  createSale,
  getAllSales,
  };

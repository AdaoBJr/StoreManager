// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createSale = async (body) => {
  const db = await mongoConnection.connection();
  const { insertedId: id } = await db.collection('sales')
    .insertOne({ itensSold: [...body] });

  return {
    _id: id,
    itensSold: [...body],
  };
};

module.exports = {
  createSale,
  // findByName,
  // getAll,
  // getById,
  // update,
  // exclude,
};
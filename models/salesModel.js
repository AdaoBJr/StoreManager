const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');
// const productModel = require('./productsModel');

const create = async (body) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));
  const { insertedId: id } = await productsCollection.insertOne({ itensSold: [...body] });
  return { _id: id, itensSold: [...body] };
};

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const sale = await db.collection('sales').find().toArray();
  return sale;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  const saleId = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return saleId;
};

const update = async (idParams, body) => {
  if (!ObjectId.isValid(idParams)) return null;
  const updateSale = body.filter(async (sale) => {
    const { productId, quantity } = await mongoConnection.getConnection()
      .then((db) => db.collection('sales').updateOne({ _id: ObjectId(idParams) },
      { $set: { productId: sale.productId, quantity: sale.quantity } }));
    return { productId, quantity };  
  });
  // console.log(updateSale[0]);
  return updateSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};

const { ObjectId } = require('mongodb');
const mongoConnect = require('./connection');

const create = async ({ itensSold }) => {
  const salesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('sales'));

  const { insertedId: id } = await salesCollection
    .insertOne({ itensSold });

  return { id };
};

const getAll = async () => {
  const salesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('sales'));

  const sales = await salesCollection
    .find().toArray();

  return { sales };
};

const findById = async ({ id }) => {
  const salesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('sales'));    

  const sale = await salesCollection
    .findOne(new ObjectId(id));
  
    return { sale };
};

const update = async ({ id, itensSold }) => {
  const salesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('sales'));

  await salesCollection
    .updateOne({ _id: new ObjectId(id) }, { $set: { itensSold } });
};

// const deleteProd = async ({ id }) => {
//   const productsCollection = await mongoConnect.getConnection()
//     .then((db) => db.collection('products'));

//   const { product } = await findById({ id });

//   await productsCollection
//     .deleteOne({ _id: new ObjectId(id) });

//   return { product };
// };

module.exports = {
  create,
  getAll,
  findById,
  update,
};
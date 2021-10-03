const { ObjectId } = require('mongodb');
const connection = require('./connection');

const colection = 'sales';

const add = async (itensSold) => connection()
  .then((db) => db.collection(colection).insertOne({ itensSold }))
  .then((response) => response.ops[0]);

const getAll = async () => connection()
  .then((db) => db.collection(colection).find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection(colection).findOne(new ObjectId(id)));

const update = (productId, quantity) => connection()
  .then((db) => db.collection(colection).aggregate([
    { $unwind: '$itensSold' },
    { $match: { 'itensSold.productId': productId } },
    { $set: { 'itensSold.quantity': quantity } },
  ]).toArray());

  const remove = async (id) => {
    if (!ObjectId.isValid(id)) return null;
  
    const saleToBeRemoved = await getById(id);
  
    if (!saleToBeRemoved) return null;
  
    return connection()
      .then((db) => db.collection(colection).deleteOne({ _id: new ObjectId(id) }))
      .then(() => saleToBeRemoved);
  };  

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};

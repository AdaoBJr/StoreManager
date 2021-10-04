const { ObjectId } = require('mongodb');
const connection = require('./connection');
const productsModel = require('./productsModel');

const colection = 'sales';

const add = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  const currentProduct = await productsModel.getById(productId);
  const currentQuantity = currentProduct.quantity;
  const newQuantity = currentQuantity - quantity;
  const minQuantity = 0;

  if (newQuantity < minQuantity) return null;

  await productsModel.update(productId, currentProduct.name, newQuantity);

  return connection()
    .then((db) => db.collection(colection).insertOne({ itensSold }))
    .then((response) => response.ops[0]);
};

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

  const { productId, quantity } = saleToBeRemoved.itensSold[0];
  const { name, quantity: currentQuantity } = await productsModel.getById(productId);
  const newQuantity = currentQuantity + quantity;

  await productsModel.update(productId, name, newQuantity);
  
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

const { ObjectId } = require('mongodb');
const connection = require('./connection');
const ProductsModel = require('./productModel');

const getAll = async () => {
  const db = await connection();

  const getSales = await db.collection('sales').find().toArray();

  return { sales: getSales };
};

const getById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  if (!sale) return null;

  return sale;
};

const create = async (sale) => {
  const db = await connection();
  const [{ productId, quantity }] = sale;
  const getProduct = await ProductsModel.getById(productId);

  if (getProduct.quantity < quantity) {
    return null;
  }
  
  await db.collection('products')
    .updateOne({ _id: ObjectId(productId) }, { $inc: { quantity: quantity * (-1) } });  
  
  const createdSale = await db.collection('sales')
    .insertOne({ itensSold: sale });

  return createdSale.ops[0];
};

const update = async (id, itensSold) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });

  return { _id: id, itensSold };
};

const exclude = async (id) => {
  const db = await connection();
  const response = await getById(id);
  const { itensSold } = await getById(id);

  if (!response) return null;
  
  await db.collection('products')
    .updateOne({ _id: ObjectId(itensSold[0].productId) },
      { $inc: { quantity: itensSold[0].quantity * 1 } }); 

  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return response;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
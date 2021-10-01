const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Atenção: formato antigo possuía um return:
const formatProduct = ({ name, quantity, pid }) => ({ pid, name, quantity });

const create = async (name, quantity) => {
  const db = await connection();
  const createNew = await db.collection('products').insertOne({ name, quantity }); 
  const result = await createNew.ops[0];
  return formatProduct(result);
};

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  if (!product) return null;
  return formatProduct(product);
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const pid = ObjectId(id);
  const product = await connection()
    .then((db) => db.collection('products').findOne({ pid }));
  if (!product) return null;
  return formatProduct(product);
};

const getAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find());
  const result = await products.toArray();
  return result.map(formatProduct);
};

const edit = async (id, name, quantity) => {
  const db = await connection();
  const pid = ObjectId(id);
  const edition = await db.collection('products')
    .updateOne({ pid }, { $set: { name, quantity } }); 
  const edited = await findById(id);
  console.log(edition);
  return formatProduct(edited);
};

const deleteOne = async (id) => {
  const db = await connection();
  const pid = ObjectId(id);
  const deleted = await findById(id);
  const deleting = await db.collection('products')
    .deleteOne({ pid });
  console.log(deleting);
  return formatProduct(deleted);
};

module.exports = { create, findByName, getAll, findById, edit, deleteOne };

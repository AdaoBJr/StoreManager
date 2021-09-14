const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => ({ products }));
    // .then((products) => products);
    // .then((products) => products.map(({ _id, name, quantity }) => ({ _id, name, quantity })));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productData = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)))
    .then((product) => product);

  if (!productData) return null;

  // const { name, quantity } = productData;

  // return { id, name, quantity };
  return productData;
};

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    // .then((result) => ({ _id: result.insertedId, name, quantity }));
    .then((result) => result.ops[0]);
    // .then((result) => console.log(result));
  
const update = async (id, name, quantity) =>
  connection()
    .then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    .then(() => ({ _id: id, name, quantity }));
    // .then((result) => result);
  
const remove = async (id) =>
  connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
    // .then((result) => console.log('delete', result));
    // .then((result) => result);

const findByName = async (name) => {
  // Executamos a consulta e retornamos o resultado
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  // Caso nenhum product seja encontrado, devolvemos null
  if (!product) return null;

  // Caso contrário, retornamos o product encontrado
  return product;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  findByName,
};
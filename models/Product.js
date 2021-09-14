const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Busca todos os produtoses do banco.

const getAll = async () => connection()
    .then((db) => db.collection('products').find().toArray());
    // .then((products) => products);

/*
Busca um produto específico, a partir do seu ID
@param {String} id ID do produto a ser recuperado
*/
const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productData = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!productData) return null;

  // const { name, quantity } = productData;

  // return { id, name, quantity };
  return productData;
};

// const isNonEmptyString = (value) => {
//   if (!value) return false;

//   return typeof value === 'string';
// };

// const isValid = (firstName, middleName, lastName) => {
//   if (middleName && typeof middleName !== 'string') return false;

//   return isNonEmptyString(firstName) && isNonEmptyString(lastName);
// };

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ id: result.insertedId, name, quantity }));
  
const update = async (id, name, quantity) =>
connection()
  .then((db) => db.collection('products').updateOne({ _id: id }, { $set: { name, quantity } }))
  .then((result) => result);
  
const remove = async (id) =>
connection()
  .then((db) => db.collection('products').deleteOne({ _id: id }))
  .then((result) => result);

const findByName = async (name) => {
  // Executamos a consulta e retornamos o resultado
  const product = await connection()
    .then((db) => db.collection('products').findOne(name));

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
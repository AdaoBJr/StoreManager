const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Cria uma string com o nome completo do autor

// Busca todos os autores do banco.

// const getAll = async () => connection()
//     .then((db) => db.collection('products').find().toArray())
//     .then((produts) =>
//     produts.map(({ _id, name, quantity }) =>
//         getNewProduct({
//           _id,
//           name,
//           quantity,
//           })));

const getAll = async () => connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => ({ products }));

/*
Busca um autor específico, a partir do seu ID
@param {String} id ID do autor a ser recuperado
*/
const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productData = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!productData) return null;

  return productData;
};

const create = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products')
    .insertOne({ name, quantity });
    return { _id: product.insertedId, name, quantity };
};

const update = async (_id, name, quantity) => {
  const db = await connection();
  await db.collection('products')
    .updateOne({ _id: new ObjectId(_id) }, { $set: { name, quantity } });

      return { _id, name, quantity }; 
};

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  // Caso nenhum product seja encontrado, devolvemos null
  if (!product) return null;

  // Caso contrário, retornamos o produto encontrado
  return (product);
};

module.exports = {
  getAll,
  getById,
  create,
  findByName,
  update,
};
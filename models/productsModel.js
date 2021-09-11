// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Cria uma string com o nome completo do autor

const getNewProduct = (productData) => {
const { _id, name, quantity } = productData;

return {
  _id,
  name,
  quantity,
 };
};

// Busca todos os autores do banco.

// const getAll = async () => connection()
//     .then((db) => db.collection('authors').find().toArray())
//     .then((authors) =>
//       authors.map(({ _id, firstName, middleName, lastName }) =>
//         getNewAuthor({
//           id: _id,
//           firstName,
//           middleName,
//           lastName,
//         })));

// /*
// Busca um autor específico, a partir do seu ID
// @param {String} id ID do autor a ser recuperado
// */
// const findById = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     return null;
//   }

//   const authorData = await connection()
//     .then((db) => db.collection('authors').findOne(new ObjectId(id)));

//   if (!authorData) return null;

//   const { firstName, middleName, lastName } = authorData;

//   return getNewAuthor({ id, firstName, middleName, lastName });
// };

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
    .then((result) => getNewProduct({ _id: result.insertedId, name, quantity }));

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  // Caso nenhum product seja encontrado, devolvemos null
  if (!product) return null;

  // Caso contrário, retornamos o author encontrado
  return getNewProduct(product);
};

module.exports = {
  create,
  findByName,
};
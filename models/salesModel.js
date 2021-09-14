const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Cria uma string com o nome completo do autor

// Busca todos os autores do banco.

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales')
    .find().toArray();
  if (sales.length === 0) return null;
  return { sales };
};

/*
Busca um autor específico, a partir do seu ID
@param {String} id ID do autor a ser recuperado
*/
const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const saleData = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!saleData) return null;

  return saleData;
};

const create = async (productArray) => {
  const db = await connection();
  const sale = await db.collection('sales')
    .insertOne({ itensSold: productArray });
    return { _id: sale.insertedId, itensSold: productArray };
};

// plantão amanha
const productsExist = async (productArray) => {
  const db = await connection();
  await db.collection('products')
    .find({ _id: { $in: productArray } }).toArray();
};

const update = async (_id, productArray) => {
  const db = await connection();
  await db.collection('sales')
    .updateOne({ _id: new ObjectId(_id) }, { $set: { itensSold: productArray } });

      return { _id, itensSold: productArray }; 
};

// const deleteOne = async (id) => {
//   const db = await connection();
//   await db.collection('products').deleteOne({ _id: ObjectId(id) });
// };

// const findByName = async (name) => {
//   const product = await connection()
//     .then((db) => db.collection('products').findOne({ name }));

//   // Caso nenhum product seja encontrado, devolvemos null
//   if (!product) return null;

//   // Caso contrário, retornamos o produto encontrado
//   return (product);
// };

module.exports = {
  getAll,
  getById,
  create,
  productsExist,
  // findByName,
  update,
  // deleteOne,
};
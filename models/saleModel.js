const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { productIdExists } = require('./productModel');

const isProductIdValid = async (productId) => {
    const idExists = await productIdExists(productId);
    return /* ObjectId.isValid(productId) && */ idExists;
};

const createSale = async (itensSold) => {
  const { productId, quantity } = itensSold;
  
  if (!ObjectId.isValid(productId) || !productIdExists(productId)) {
    return null;
  }

  return connection.getConnection()
  .then((db) => db.collection('sales').insertOne({ productId, quantity }))
  .then((result) => result.ops[0]);
};

const teste = [
  {
    id: ObjectId('6140feaf1be1cdcefc794995'),
    name: 'Produto do Batistaa',
    quantity: 100,
  },
  {
    id: ObjectId('61410ed20086f9f7535d6ac9'),
    name: 'Produto Silva',
    quantity: 10,
  },
  {
    id: ObjectId('6144450f15497065970c8e90'),
    name: 'Abacaxi',
    quantity: 8,
  },
  {
    id: ObjectId('6144452915497065970c8e91'),
    name: 'Pipoca',
    quantity: 10,
  },
  {
    id: '6144454615497065970c8e92',
    name: 'Jujuba',
    quantity: 5,
  },
];
// ok - (teste.every((item) => ObjectId.isValid(item.id)))
// const areItensSoldValid = teste.map((item) => productIdExists(item.id).then((result) => result));
// (async () => {
//   const resultado = await Promise.all(areItensSoldValid);
//   console.log(resultado.every((item) => item)); 
// })();
const ttt = async () => {
  const isFunc = await Promise.all(teste.map(async ({ id }) => isProductIdValid(id)));
  console.log(isFunc);
};

ttt();
console.log('Ola mundo');

// console.log(teste.some(async (item) => isNotProductIdValid(item.id).then((res) => res)));

module.exports = {
  createSale,
};
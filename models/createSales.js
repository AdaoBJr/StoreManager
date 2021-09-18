const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const update = async ({ id, name, quantity }) => {
  const productsCollection = await getConnection()
    .then((db) => db.collection('products'));

  await productsCollection
    .updateOne({ _id: new ObjectId(id) }, { $set: { name, quantity } });
};

const findById = async ({ id }) => {
  const productsCollection = await getConnection()
    .then((db) => db.collection('products'));    

  const product = await productsCollection
    .findOne(new ObjectId(id));
  
    return { product };
};

const expendQuantProducts = async ({ itensSold }) => {
  itensSold.forEach(async ({ productId: id, quantity }) => {
    const { product } = await findById({ id });
    await update({ id, name: product.name, quantity: product.quantity - quantity });
  });
};

const create = async ({ itensSold }) => {
  const salesCollection = await getConnection()
    .then((db) => db.collection('sales'));
  
    const { insertedId: id } = await salesCollection
    .insertOne({ itensSold });

  await expendQuantProducts({ itensSold });
    
  return { id };
};

const createSales = async (req, res) => {
  const itensSold = req.body;

  const { id: _id } = await create({ itensSold });
  
  return res.status(200).json({ _id, itensSold });
};

module.exports = {
    createSales,
};
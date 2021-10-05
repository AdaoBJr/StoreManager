const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async (name) => {
  const product = await connection.getConnection()
    .then((db) => db.collection('products').findOne({ name }));
  
  return product !== null;
};

const createProduct = async ({ name, quantity }) => connection
.getConnection()
.then((db) => db.collection('products').insertOne({ name, quantity }))
.then((result) => result.ops[0]);

const listAllProducts = async () => connection
.getConnection()
.then((db) =>
  db.collection('products').find().toArray());

const findById = async (id) => {
    if (!ObjectId.isValid(id)) {
        return null;
    }
    return connection.getConnection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const findByName = async (name) => {
    const productsConnection = await connection.getConnection()
    .then((db) => db.collection('products').findOne({ name }));

    return productsConnection !== null;
};

const updateProduct = async (id, name, quantity) => {
    const productsConnection = await connection.getConnection()
    .then((db) => db.collection('products'));
  
    await productsConnection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          quantity,
        },
      },
    );
    return { id, name, quantity };
  }; 

  const deleteProduct = async (id) => {
    const productsConnection = await connection.getConnection()
    .then((db) => db.collection('products'));
  
    const { deletedCount } = await productsConnection.deleteOne({ _id: ObjectId(id) });
  
    return deletedCount;
  };

module.exports = {
    createProduct,
    listAllProducts,
    findById,
    findByName,
    updateProduct,
    deleteProduct,
    productExists,
};

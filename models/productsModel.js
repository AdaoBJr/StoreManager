const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
    const productsConnection = await connection.getConnection()
    .then((db) => db.collection('products'));
  
    const { insertedId: id } = await productsConnection.insertOne({ name, quantity });
  
    return {
      _id: id,
      name,
      quantity,
    };
  };

const getAllProducts = async () => {
    const productsConnection = await connection.getConnection()
    .then((db) => db.collection('products'));

    const listOfProducts = await productsConnection.find().toArray();

    return {
        products: listOfProducts,
    };
};

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
    getAllProducts,
    findById,
    findByName,
    updateProduct,
    deleteProduct,
};

const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

const createNewProduct = async ({ name, quantity }) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(newProduct);
  return { _id: insertedId, name, quantity };
};

const getAllProducts = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

const getProductById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  if (product) {
    return { status: 200, product };
  }
  return {
    status: 422,
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };
};

const updateProduct = async ({ id, name, quantity }) => {
  const db = await connection();
  const product = await db.collection('products').updateOne({ _id: ObjectId(id) },
  { $set: { name, quantity } });

  return product;
};

const deleteProductById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return product;
};

const productSell = async ({ productId, quantity }) => {
  const db = await connection();
  const allProducts = await getAllProducts();
  const productExist = allProducts.some(({ _id }) =>
    ObjectId.toString(_id) === ObjectId.toString(productId));
 
  if (productExist) {
    const product = allProducts.find(({ _id }) =>
      ObjectId.toString(_id) === ObjectId.toString(productId));
      
    product.quantity -= quantity;
    if (product.quantity >= 0) {
      const updatedProduct = await db.collection('products').updateOne({ _id: ObjectId(productId) },
      { $set: { quantity: product.quantity } });
      return updatedProduct;
    }
  }
  
  return false;
};

const productReturn = async ({ productId, quantity }) => {
 const db = await connection();
  const allProducts = await getAllProducts();
  const productExist = allProducts.some(({ _id }) => 
    ObjectId.toString(_id) === ObjectId.toString(productId));

  if (productExist) {
    const product = await allProducts.find(({ _id }) =>
      ObjectId.toString(_id) === ObjectId.toString(productId));
    product.quantity += quantity;
    const updatedProduct = db.collection('products').updateOne({ _id: ObjectId(productId) },
    { $set: { quantity: product.quantity } });
    return updatedProduct;
  }
  
  return false;
};
module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProductById,
  productSell,
  productReturn,
};
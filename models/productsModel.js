const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  const { _id } = result.ops[0];
  return { _id, name, quantity };
};

const findName = async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
};

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('products').findOne(new ObjectId(id));
  return result;
};

const updateProduct = async (name, quantity, id) => {
  const db = await connection();
  console.log('id da funcao update product', id);
  await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  const updatedProduct = await getById(id);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const db = await connection();
  const deletedData = await getById(id);
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return deletedData;
};

const updateQuantityAfterCreate = async (createdSale) => {
  const saleArray = createdSale.ops[0].itensSold;
  await saleArray.forEach(async (product) => {
    const outDatedProduct = await getById(product.productId);
    const { _id } = outDatedProduct;
    const updatedQuantity = outDatedProduct.quantity - product.quantity;
    await updateProduct(outDatedProduct.name, updatedQuantity, _id);
  });
};

const updateQuantityAfterDelete = async (deletedSale) => {
  const { itensSold } = deletedSale;
  await itensSold.forEach(async (product) => {
    const outDatedProduct = await getById(product.productId);
    const { _id } = outDatedProduct;
    const updatedQuantity = outDatedProduct.quantity + product.quantity;
    await updateProduct(outDatedProduct.name, updatedQuantity, _id);
  });
};

module.exports = {
  createProduct,
  findName,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
  updateQuantityAfterCreate,
  updateQuantityAfterDelete,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { AppError, errorCodes } = require('../utils');

const checkNameExists = async (_schema, data) => {
  try {
    const db = await connection();
    return !(await db.collection('products').findOne({ name: data }));
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const checkIdExists = async (_schema, data) => {
  try {
    const db = await connection();
    return !!(await db.collection('products').findOne({ _id: ObjectId(data) }));
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const getAll = async () => {
  try {
    const db = await connection();
    return await db.collection('products').find().toArray();
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const getById = async (id) => {
  try {
    const db = await connection();
    return await db.collection('products').findOne(new ObjectId(id));
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const createProduct = async (product) => {
  try {
    const db = await connection();
    return await db.collection('products').insertOne(product);
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const updateProduct = async (id, newInfo) => {
  try {
    const db = await connection();
    const objectId = new ObjectId(id);
    const updatedProduct = await db
      .collection('products')
      .updateOne({ _id: objectId }, { $set: newInfo });
    return updatedProduct;
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const updateProductDecQuantity = async (id, newInfo) => {
  try {
    const db = await connection();
    const objectId = new ObjectId(id);
    const updatedProduct = await db
      .collection('products')
      .updateOne({ _id: objectId }, { $inc: { quantity: -newInfo } });
    return updatedProduct;
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const updateProductIncQuantity = async (id, newInfo) => {
  try {
    const db = await connection();
    const objectId = new ObjectId(id);
    const updatedProduct = await db
      .collection('products')
      .updateOne({ _id: objectId }, { $inc: { quantity: newInfo } });
    return updatedProduct;
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const deleteProduct = async (id) => {
  try {
    const db = await connection();
    const product = await db.collection('products').findOne(new ObjectId(id));
    if (product) {
      await db.collection('products').deleteOne({ _id: ObjectId(id) });
    }
    return product;
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

module.exports = {
  checkNameExists,
  checkIdExists,
  createProduct,
  updateProduct,
  updateProductDecQuantity,
  updateProductIncQuantity,
  deleteProduct,
  getById,
  getAll,
};

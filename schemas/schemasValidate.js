const { ObjectId } = require('mongodb');
const { getAll } = require('../model/modelProducts');
const getConnecion = require('../model/connection');

const code = 'invalid_data';

const errors = {
  alreadyExist: { err: {
    code,
    message: 'Product already exists',
  } },
  invalidName: { err: {
    code,
    message: '"name" length must be at least 5 characters long',
  } },
  isNotString: { err: {
    code,
    message: '"name" must be a string',
  } },
  invalidQuantity: { err: {
    code,
    message: '"quantity" must be larger than or equal to 1',
  } },
  isNotNumber: { err: {
    code,
    message: '"quantity" must be a number',
  } },
  invalidQuantitySales: { err: {
    // code: 'stock_problem',
    code,
    message: '"quantity" must be larger than or equal to 1',
  } },
  isNotNumberSales: { err: {
    // code: 'stock_problem',
    code,
    message: '"quantity" must be a number',
  } },
};

const format = (sale) => ({ itensSold: sale });

const nameLength = (value) => (value.length < 5);
const notString = (value) => (typeof value !== 'string');
const notNumber = (value) => (typeof value !== 'number');
const largerThanOne = (value) => (value < 1);

const quantityValid = (quantity) => {
  switch (true) {
    case largerThanOne(quantity): return errors.invalidQuantity;
    case notNumber(quantity): return errors.isNotNumber;
    default: return {};
  }
};

const quantitySalesValid = async (quantity) => {
  switch (true) {
    case await largerThanOne(quantity): return errors.invalidQuantitySales;
    case await notNumber(quantity): return errors.isNotNumberSales;
    default: return {};
  }
};

const productExists = async ({ id }) => {
  const db = await getConnecion();
  if (!id || id.length !== 24) {
    return null;
  }
  const product = await db.collection('products').findOne(ObjectId(id));
  console.log(product, 'schema');
  return product;
};

const findByName = async (name) => {
  const productList = await getAll();

  const product = productList.find((el) => el.name === name);
  if (!product) return {};

  return errors.alreadyExist;
};

const nameValid = async (name) => {
  switch (true) {
    case nameLength(name): return errors.invalidName;
    case notString(name): return errors.isNotString;
    default: return {};
  }
};

const isValid = async (name, quantity) => {
  const product = await nameValid(name);

  if (product.err) return product;
  if (quantityValid(quantity).err) return quantityValid(quantity);

  return {};
};

module.exports = { isValid, findByName, productExists, format, quantitySalesValid };
const { ObjectId } = require('mongodb');

const connection = require('./connection');

const COLLECTION = 'sales';

const ERRORS = {
  invalidSaleData: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
  notFoundSaleData: {
    code: 'not_found',
    message: 'Sale not found',
  },
  invalidId: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
};

async function getAll() {
  const sales = await connection().then((db) => db.collection(COLLECTION).find().toArray())
  .then((results) => (results.length > 0 ? results : ''));

  if (!sales) {
    return { sales };
  }
  
  return { sales };
}

async function getById(id) {
  const sale = await connection()
    .then((db) => db.collection(COLLECTION).findOne({ _id: ObjectId(id) }));

  if (!sale) { return { error: ERRORS.notFoundSaleData }; }

  return { sale };
}

async function create(data) {
  try {
    const newData = { itensSold: data };

    const newSale = await connection()
      .then((db) => db.collection(COLLECTION).insertOne(newData))
      .then(({ ops }) => ops[0]);

      return newSale;
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

async function update(id, data) {
  try {
    const updatedData = { itensSold: data };

    const updatedSale = await connection()
      .then((db) => db.collection(COLLECTION).updateOne(
        { _id: ObjectId(id) }, { $set: updatedData }, { returnOriginal: false },
      ));

    if (!updatedSale) { return { error: ERRORS.invalidSaleData }; }

    return { result: { _id: id, itensSold: data } };
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

async function obliterate(id) {
  try {
    const { error, sale } = await getById(id);
    
    if (error) { return { error: ERRORS.invalidId }; }
    
    await connection()
      .then((db) => db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) }));

    return { sale };
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

module.exports = { create, getAll, getById, update, obliterate };

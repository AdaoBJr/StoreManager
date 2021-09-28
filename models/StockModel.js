const { ObjectId } = require('mongodb');

const connection = require('./connection');

const COLLECTION = 'products';

async function update(productId, quantity) {
  await connection()
    .then((db) => db.collection(COLLECTION)).updateOne(
      { _id: ObjectId(productId) },
      { $inc: { quantity } },
      { returnOriginal: false },
  );
}

async function bulkUpdate(data, inc = true) {
  await data.forEach(async ({ productId, quantity }, index) => {
    console.log(`Rodada ${index + 1}: ${productId}, ${quantity}.`);

    if (inc) {
      await update(productId, quantity);
    }

    await update(productId, (-quantity));
  });
  
  console.log('ACABOU!');
}

module.exports = { update, bulkUpdate };
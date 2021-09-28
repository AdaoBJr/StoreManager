const mongoConnection = require('./connection');

const create = async ({ title, directedBy, releaseYear }) => {
  const moviesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('movies'));

  const { insertedId: id } = await moviesCollection
    .insertOne({ title, directedBy, releaseYear });

  return {
    id,
  };
};

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const movies = await db.collection('movies')
    .find()
    .toArray();

  return movies;
};

module.exports = {
  create,
  getAll,
};

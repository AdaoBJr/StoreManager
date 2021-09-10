const ProductModel = require('../models/ProductModel');

const isValidName = (name) => {
  // name deve ser uma string com mais de 5 caracteres e deve ser único;
  if (typeof name !== 'string' || name.length < 5) return false;
  
  return true;
};

const isValidQuantity = (quantity) => {
  if (typeof quantity !== 'number' && quantity <= 0) return false;

  return true;
};  

const create = async ({ name, quantity }) => {
  const isNameValid = isValidName(name);
  const isQuantityValid = isValidQuantity(quantity);

  if (!isNameValid || !isQuantityValid) return false;
  
  const { id } = await ProductModel
    .create({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

// const getNewMovie = (movieData) => {
//   const { id, title, directedBy, releaseYear } = movieData;

//   return { id, title, directedBy, releaseYear };
// };

// const getAll = async () => {
//   const moviesData = await ProductModel
//     .getAll();
//   return moviesData.map(getNewMovie);
// };

module.exports = {
  create,
  // getAll,
}; 
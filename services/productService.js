const productModel = require('../models/productModel');

const isValidName = (name) => {
  // name deve ser uma string com mais de 5 caracteres e deve ser único;
  if (typeof name !== 'string' && name.length <= 5) return false;

  return true;
};

const isValidQuantity = (quantity) => {
  if (typeof quantity !== 'number' && quantity <= 0) return false;

  return true;
};  

const registration = async ({ name, quantity }) => {
  const isNameValid = isValidName(name);
  const isQuantityValid = isValidQuantity(quantity);

  if (!isNameValid || !isQuantityValid) return false;
  
  const { id } = await productModel
    .registration({ name, quantity });

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
//   const moviesData = await productModel
//     .getAll();
//   return moviesData.map(getNewMovie);
// };

module.exports = {
  registration,
  // getAll,
}; 
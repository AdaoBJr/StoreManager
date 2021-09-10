const productModel = require('../models/productsModel');

const isValidName = (name) => {
  if (typeof name !== 'string' || name.length <= 5) return false;

  return true;
};

const isValidQuantity = (quantity) => {
    const moreZero = quantity > 0;
    if (!moreZero || typeof quantity !== 'number') return false;
    return true;
  };
  
const create = async ({ name, quantity }) => {
  const isProductNameValid = isValidName(name);
  const isProductQuantityValid = isValidQuantity(quantity); 
  if (!isProductNameValid || isProductQuantityValid) return false;

  const { id } = await productModel.create({ name, quantity });
  return {
    id,
    name,
    quantity,
  };
};

/* const getNewMovie = (movieData) => {
  const { id, title, directedBy, releaseYear } = movieData;

  return { id, title, directedBy, releaseYear };
}; */

// const getAll = async () => {
//   const productData = await MoviesModel
//     .getAll();
//   return moviesData.map(getNewMovie);
// };

module.exports = {
  create,
  /* getAll */
}; 
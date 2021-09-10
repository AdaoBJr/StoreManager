const ProductModel = require('../models/ProductModel');

// const getAll = async () => {
//   return await ProductModel.getAll();
// };

const isValidName = (name) => {
  // name deve ser uma string com mais de 5 caracteres e deve ser único;
  if (typeof name !== 'string') {
    console.log(typeof name);
    return false;/* {
      err: {
        code: 'invalid_data',
        message: 'name must be string ',
      },
    }; */
  }
  
  if (name.length < 5) {
    return false;/* {
      err: {
        code: 'invalid_data',
        message: 'name length must be at least 5 characters long',
      },
    }; */
  }

  // const product = ProductModel.findOne({ name });
  // if (!product) {
  //   return {
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Product already exists',
  //     },
  //   };
  // }
  
  return true;
};

const isValidQuantity = (quantity) => {
  if (typeof quantity !== 'number') return false;
 
  if (quantity < 0) {
    return false; /* {
      err: {
        code: 'invalid_data',
        message: 'quantity must be larger than or equal to 1',
      },
    }; */
  }

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
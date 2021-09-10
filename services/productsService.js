const productsModel = require('../models/productsModel');

const validName = (name) => {
    console.log(name);
    if (name.length < 5 || typeof (name) !== 'string') return false;

  return true;
};

const validQuantity = (quantity) => {
    if (quantity <= 0) { return false; }
    return true;
};
const validTypeQuantity = (quantity) => {
    if (typeof (quantity) === 'string') { return false; }
    return true;
};

const getAllProducts = async () => {
    const products = productsModel.getAll();
    if (!products) {
        return null;
    }
    return products;
};
const createProduct = async ({ name, quantity }) => {
    const productExists = await productsModel.productsExists(name);
    if (productExists) {
         return false; 
}
    const response = await productsModel.create({ name, quantity });
    return response;
};

// const updateSong = async ({ id, name, album }) => {
//     if (songExists)
//         return null;

//     //Validação de outros campos também viriam aqui
//     return await songModel.update({ id, name, album });
// }

module.exports = { createProduct, getAllProducts, validName, validQuantity, validTypeQuantity };
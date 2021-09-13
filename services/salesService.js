const salesModel = require('../models/salesModel');

const validProduct = async (id) => {
   const productExist = await salesModel.getById(id);
//    console.log('service valida produto');
//    console.log(productExist);
   if (productExist) return true;
   return false;
};

const validQuantity = (sales) => {
    const validQuantityS = sales.filter((sale) => sale.quantity <= 0);

    return validQuantityS;
};
const validTypeQuantity = (sales) => {
    const filtered = sales.filter((sale) => typeof (sale.quantity) !== 'number');
    return filtered;
};

const getAllSales = async () => {
    const sales = salesModel.getAll();
    if (!sales) {
        return null;
    }
    return sales;
};

const getSaleById = async (id) => {
    // console.log(id);
    const saleExist = await salesModel.saleExists(id);
    if (!saleExist) {
        return false;
    }
    const product = await salesModel.getById(id);
    if (!product) {
        return null;
    }
    return product;
};

const createSale = async (sales) => {
    const response = await salesModel.create(sales);
    return response;
};

// const updateProduct = async ({ id, name, quantity }) => {
//     const productExists = await productsModel.productsExists(name);
//     // console.log(productExists);
//     if (productExists) {
//         const response = await productsModel.update({ id, name, quantity });
//         return response;
//     }
//     return false;
// };
// const deleteProduct = async (id) => {
//     const productDeletado = await productsModel.getById(id);
//     const product = await productsModel.deleteProduct(id);

//     if (product) {
//         return productDeletado;
//     }
//     return false;
// };

module.exports = {
    getAllSales, 
    createSale,
    validTypeQuantity,
     validQuantity,
     validProduct,
     getSaleById,
};
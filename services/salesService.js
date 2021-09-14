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
    const saleExist = await salesModel.saleExists1(id);
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

const updateSale = async (id, sale) => {
    // console.log(id);
    // console.log(sale);
    const productExists = await salesModel.saleExists(id);
    //  console.log(productExists);
    if (productExists) {
        const response = await salesModel.update(id, sale);
      
        return response;
    }
    return false;
};
const deleteSale = async (id) => {
    const productDeletado = await salesModel.getById(id);
    const product = await salesModel.deleteSale(id);

    if (product) {
        return productDeletado;
    }
    return false;
};

module.exports = {
    getAllSales, 
    createSale,
    validTypeQuantity,
     validQuantity,
     validProduct,
     getSaleById,
     updateSale,
     deleteSale,
};
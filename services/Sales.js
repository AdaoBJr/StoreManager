const Sales = require('../models/Sales');

const validations = require('../schemas/salesValidations');

const registerNewSales = async (sales) => {
  const validateProductIdOfSales = validations.validateProductIdOfSales(sales);
  if (validateProductIdOfSales.message) {
    return {
      code: validateProductIdOfSales.code,
      message: validateProductIdOfSales.message,
    };
  }

  const validateQtyOfSales = validations.validateQuantity(sales);
  if (validateQtyOfSales.message) {
    return {
      code: validateQtyOfSales.code,
      message: validateQtyOfSales.message,
    };
  }

  const addedSales = await Sales.registerNewSales(sales);
  if (addedSales.message) return { message: addedSales.message };

  return addedSales;
};

const getAllSales = async () => {
  const allSales = await Sales.getAllSales();
  if (allSales.message) return { message: allSales.message };

  return {
    sales: allSales,
  };
};

const getSaleById = async (id) => {
  const validateIdMongo = validations.validateIdMongo(id);
  if (validateIdMongo.message) {
    return {
      code: validateIdMongo.code,
      message: validateIdMongo.message,
    };
  }

  const validateIfSaleExists = validations.validateIfSaleExists(id);
  if (validateIfSaleExists.message) {
    return {
      code: validateIfSaleExists.code,
      message: validateIfSaleExists.message,
    };
  }
  
  const sale = await Sales.getSaleById(id);
  if (sale.message) return { message: sale.message };

  return sale;
};

const overwritingItensSold = async (id, sales) => {
  const sale = await getSaleById(id);
  if (sale.message) {
    return {
      code: sale.code,
      message: sale.message,
    };
  }

  const { itensSold } = sale;
  const itensSoldToOverwrite = itensSold.filter((item) => sales.forEach((newSale) => {
      if (newSale.productId === item.productId) return false;

      return true;
    }));

  sales.forEach((updatedSale) => itensSoldToOverwrite.push(updatedSale));

  return itensSoldToOverwrite;
};

const updateSales = async (id, sales) => {
  // const validateIfSaleExists = validations.validateIfSaleExists(id);
  // if (validateIfSaleExists.message) {
  //   return {
  //     code: validateIfSaleExists.code,
  //     message: validateIfSaleExists.message,
  //   };
  // }

  const validateQtyOfSales = validations.validateQuantity(sales);
  if (validateQtyOfSales.message) {
    return {
      code: validateQtyOfSales.code,
      message: validateQtyOfSales.message,
    };
  }

  const itensSoldToOverwrite = await overwritingItensSold(id, sales);
  if (itensSoldToOverwrite.message) {
    return {
      code: itensSoldToOverwrite.code,
      message: itensSoldToOverwrite.message,
    };
  }

  const updatedSales = await Sales.updateSales(id, itensSoldToOverwrite);
  if (updatedSales.message) return { message: updatedSales.message };

  return updatedSales;
};

const deleteSale = async (id) => {
  try {
    const sale = await Sales.getSaleById(id);
    console.log(sale);
    // if (sale.message) return { code: sale.code, message: sale.message };
  
    const deletedSale = await Sales.deleteSale(id);
    if (deletedSale.message) return { message: deletedSale.message };
  
    return sale;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registerNewSales,
  getAllSales,
  getSaleById,
  updateSales,
  deleteSale,
};

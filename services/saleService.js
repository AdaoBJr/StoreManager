const saleModel = require('../models/saleModel');

const isQuantityValid = (quantity) => (typeof quantity === 'number') && (quantity > 0);

const createSale = async ({ itensSold }) => {
  const quantityValid = itensSold.every(({ quantity }) => isQuantityValid(quantity));
  
  if (!quantityValid) {
   return {
    status: 422,
    messageResult: {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity', 
      },
    },
   };
  }

  const messageResult = await saleModel.createSale({ itensSold });
  return {
    status: 200,
    messageResult,
  };
};

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  // console.log(sales);

  return {
    status: 200,
    messageResult: {
      sales,
    },
  };
};

const getSaleById = async (id) => {
  const sale = await saleModel.getSaleById(id);
  // console.log(`sale: ${sale}`);
  if (!sale) {
    return {
      status: 404,
      messageResult: {
        err: {
          code: 'not_found',
          message: 'Sale not found', 
        },
      },
    };
  }

  return {
    status: 200,
    messageResult: sale,
  };
};

const updateSale = async ({ id, itensSold }) => {
  const quantityValid = itensSold.every(({ quantity }) => isQuantityValid(quantity));
  
  if (!quantityValid) {
   return {
    status: 422,
    messageResult: {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity', 
      },
    },
   };
  }

  const messageResult = await saleModel.updateSale({ id, itensSold });
  return {
    status: 200,
    messageResult,
  };
};

const removeSale = async (id) => {
  const sale = await saleModel.removeSale(id);

  if (!sale) {
    return {
      status: 422,
      messageResult: {
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format', 
        },
      },
    };
  }

  return {
    status: 200, 
    messageResult: sale,
  };
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  removeSale,
};
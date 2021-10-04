const model = require('../models/sales');

const saleValidation = (sale) => {
    sale.forEach((i) => {
        if (i.quantity < 1 || typeof i.quantity !== 'number') {
            const e = new Error();
            e.statusCode = 'invalidSale';
            throw e;
        }
    });
};

const newSale = async (sale) => {
    saleValidation(sale);
    const ret = await model.newSale(sale);
    return ret;
};

module.exports = {
    newSale,
};

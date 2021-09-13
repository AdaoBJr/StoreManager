const { getAll, getById, create } = require('../services/sales_service');

const createSales = async (req, res) => {
    const itensSold = req.body;
    // console.log(itensSold[0].quantity, 'controller');
    const sales = await create(itensSold);
    // console.log(sales, 'controller 2');

    return res.status(200).json(sales);
};

const getAllSales = async (req, res) => {
    const sales = await getAll();
    return res.status(200).json({ sales });
};

const getSalesById = async (req, res) => {
    const { id } = req.params;
    const sales = await getById(id);
    return res.status(200).json(sales);
};

module.exports = {
    createSales,
    getAllSales,
    getSalesById,
};
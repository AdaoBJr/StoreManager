const { getAll, getById, create, update, remove } = require('../services/sales_service');

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
    console.log(sales, 'controller');
    if (sales.error) {
        return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
    }
    return res.status(200).json(sales);
};

const updateSales = async (req, res) => {
    const { id } = req.params;
    const itensSold = req.body;
    const [{ productId, quantity }] = itensSold;

    await update(id, productId, quantity);
    return res.status(200).json({ _id: id, itensSold });
};

const removeById = async (req, res) => {
    const { id } = req.params;
    
    const product = await remove(id);
    return res.status(200).json(product);
};

module.exports = {
    createSales,
    getAllSales,
    getSalesById,
    updateSales,
    removeById,
};
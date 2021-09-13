const controller = require('../controllers/sales');

const sell = async (req, res) => {
    const products = req.body;
    const response = await controller.createSale(products);
    if (!response) {
        return res.status(422).json({
                err: {
                    code: 'invalid_data',
                    message: 'Wrong product ID or invalid quantity',
                },
            }); 
        }
    return res.status(200).json(response);
};

const findSale = async (req, res) => {
    const { id } = req.params;
    const sales = await controller.findSales(id);
    if (sales === null || sales === []) {
        return res.status(404).json({
                    err: {
                        code: 'not_found',
                        message: 'Sale not found',
                    },
                });
    }
    return res.status(200).json(sales); 
};

const getAll = async (_req, res) => {
    const sales = await controller.findAllSales();
    return res.status(200).json({ sales }); 
};

module.exports = { sell, getAll, findSale };
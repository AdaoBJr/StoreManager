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

module.exports = { sell };
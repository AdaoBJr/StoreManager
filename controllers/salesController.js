const salesService = require('../services/salesService');

const validProduct = async (res, next, item) => {
    const { productId } = item;
    const productVerified = await salesService.validProduct(productId);
    if (!productVerified) {
        return res.status(422).json({
            err: {
                code: 'invalid_data',
                message: 'Produto não cadastrado',
            },
        });
    }
    next();
};

const validQuantity = (req, res, next) => {
    const quantityVerified = salesService.validQuantity(req.body);
    const quantityTypeVerified = salesService.validTypeQuantity(req.body);
    if (quantityVerified.length !== 0 || quantityTypeVerified.length !== 0) {
        return res.status(422).json({
            err: {
                code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
            },
        });
    }
    next();
};

const getAllSales = async (req, res) => {
    try {
        const AllSales = await salesService.getAllSales();
        return res.status(200).json({ sales: AllSales });
    } catch (error) {
        return res.status(422).json({
            err: {
                code: 'invalid_data',
                message: 'Wrong id format ',
            },
        });
    }
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await salesService.getSaleById(id);
        if (product === false) {
            return res.status(404).json({ err: {
                code: 'not_found',
                message: 'Sale not found',
            } });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(422).json({
            err: {
                code: 'invalid_data',
                message: 'Wrong id format',
            },
        });
    }
};

const createSale = async (req, res) => {
    try {
        const result = await salesService.createSale(req.body);
        if (!result) {
            return res.status(422).json({
                err: { code: 'invalid_data', message: 'Product already exists' },
            });
        }
        return res.status(200).json({ _id: result, itensSold: req.body });
} catch (error) {
    return res.status(500).json({ message: 'Ops, algo de errado :( ' });
}
};

const updateSale = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await salesService.updateSale(id, req.body);
        console.log(result);
        if (!result) {
            return res.status(422).json({
                err: { code: 'invalid_data', message: 'Product already exists' },
            });
        }
        return res.status(200).json({ _id: result, itensSold: req.body });
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

// const deleteProduct = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const result = await productsService.deleteProduct(id);
//         const { name, quantity } = result;
//         if (!result) {
//             return res.status(422).json({
//                 err: { code: 'invalid_data', message: 'Wrong id format' },
//             });
//         }
//         return res.status(200).json({ _id: id, name, quantity });
//     } catch (error) {
//         return res.status(500).json({ message: 'Ops, algo de errado :( ' });
//     }
// };
module.exports = {
    getAllSales,
    createSale,
    validQuantity,
    validProduct,
    getSaleById,
    updateSale,
};
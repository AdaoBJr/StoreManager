const { HTTP_CREATED_STATUS, HTTP_OK_STATUS } = require('../httpResponde');
const productsService = require('../service/productsService');

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const data = await productsService.createProduct({
        name, quantity,
    });

    return res.status(HTTP_CREATED_STATUS).send(data);
};

const getAllProducts = async (_req, res) => {
    const data = await productsService.getAllProducts();

    return res.status(HTTP_OK_STATUS).send(data);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const data = await productsService.getProductById(id);

    return res.status(HTTP_OK_STATUS).send(data);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
};
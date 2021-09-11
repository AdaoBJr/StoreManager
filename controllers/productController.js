const statusCode = require('http-status-codes');
const productService = require('../service/productService');
const productModel = require('../models/productsModel');

const create = async (req, res) => {
	const { name, quantity } = req.body;

	const product = await productService.create({ name, quantity });
	const { id } = product;
	
	if (product.message) {
		return res.status(statusCode.UNPROCESSABLE_ENTITY).json(
			{ err: { code: product.code, message: product.message } },
		);
	}

	return res.status(statusCode.CREATED).json({ _id: id, name, quantity });
};

const getAll = async (_req, res) => {
	try {
		const productID = await productModel.getAll();
		return res.status(statusCode.OK).json({ products: productID });
    } catch (error) {
	return res.status(statusCode.UNPROCESSABLE_ENTITY).json(error);
	}
};

const getById = async (req, res) => {
	const { id } = req.params;
	const product = await productService.getById(id);
	if (product.message) {
		return res.status(statusCode.UNPROCESSABLE_ENTITY).json(
			{ err: { code: product.code, message: product.message } },
);
	} 
	return res.status(statusCode.OK).json(product);
};

const update = async (req, res) => {
	const { name, quantity } = req.body;
    const { id } = req.params;
    const updatedProducts = await productService.update({ id, name, quantity });

	if (updatedProducts.message) {
		return res.status(statusCode.UNPROCESSABLE_ENTITY).json(
			{ err: { code: updatedProducts.code, message: updatedProducts.message } },
		);
	}
	
    return res.status(statusCode.OK).json(updatedProducts);
};

module.exports = {
	create,
	getAll,
	getById,
	update,
}; 

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
		const product = await productModel.getAll();
		return res.status(statusCode.OK).json(product);
    } catch (error) {
	return res.status(statusCode.UNPROCESSABLE_ENTITY).json(error);
	}
};

const getById = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await productService.getById(id);
		return res.status(statusCode.OK).json(product);
	} catch (_error) {
		const { id } = req.params;
		const product = await productService.getById(id);
		if (product.message) {
			return res.status(statusCode.UNPROCESSABLE_ENTITY).json(
				{ err: { code: product.code, message: product.message } },
			);
		}
	}
};

module.exports = {
	create,
	getAll,
	getById,
}; 
const statusCode = require('http-status-codes');
const saleService = require('../service/saleService');
const salesModel = require('../models/salesModel');

const create = async (req, res) => {
	const { body } = req;
	const { _id, message, code } = await saleService.create(body);
	if (message) {
		return res.status(statusCode.UNPROCESSABLE_ENTITY).json(
			{ err: { code, message } },
		);
	}
	return res.status(statusCode.OK).json({ _id, itensSold: [...req.body] });
};

const getAll = async (_req, res) => {
	try {
		const sales = await salesModel.getAll();
		return res.status(statusCode.OK).json({ sales });
    } catch (error) {
		return res.status(statusCode.UNPROCESSABLE_ENTITY).json(error);
	}	
};

const getById = async (req, res) => {
	const { id } = req.params;
	const sale = await saleService.getById(id);
	if (sale.message) {
		return res.status(statusCode.NOT_FOUND).json(
			{ err: { code: sale.code, message: sale.message } },
);
	} 
	return res.status(statusCode.OK).json(sale);
};

module.exports = {
	create,
	getAll,
	getById,
}; 

const statusCode = require('http-status-codes');
const saleService = require('../service/saleService');
const salesModel = require('../models/salesModel');

const create = async (req, res) => {
	const { body } = req;
	// console.log(await saleService.create(body));
	const { _id, message, code } = await saleService.create(body);
	/* console.log(result); */
	if (message) {
		return res.status(statusCode.UNPROCESSABLE_ENTITY).json(
			{ err: { code, message } },
		);
	}

	return res.status(statusCode.OK).json({ _id, itensSold: [...req.body] });
};

const getAll = async (req, res) => {
	try {
		const sale = await salesModel.getAll();
		return res.status(statusCode.OK).json({ sale });
    } catch (error) {
		return res.status(statusCode.UNPROCESSABLE_ENTITY).json(error);
	}	
};

module.exports = {
	create,
	getAll,
}; 

const statusCode = require('http-status-codes');
const saleService = require('../service/saleService');

const create = async (req, res) => {
	const [{ productId, quantity }] = req.body;

	const { id, code, message } = await saleService.create(productId, quantity);
	/* const { id } = sale; */
	/* console.log(id, 'controller');
    console.log(productId, 'controller'); */
	if (message) {
		return res.status(statusCode.UNPROCESSABLE_ENTITY).json(
			{ err: { code, message } },
		);
	}

	return res.status(statusCode.OK).json({ _id: id, itensSold: [...req.body] });
};

module.exports = {
	create,
}; 

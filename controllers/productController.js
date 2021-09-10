const statusCode = require('http-status-codes');
const productService = require('../service/productService');

const create = async (req, res) => {
	const { name, quantity } = req.body;

	const product = await productService.create(name, quantity);
  const { id } = product;

	if (product.message) {
	return res.status(statusCode.UNPROCESSABLE_ENTITY).json(
		{ err: { code: product.code, message: product.message } },
	);
	}

	return res.status(statusCode.OK).json({ id, name, quantity });
};

/* const getAll = async (_req, res) => {
	const movies = await MoviesService
		.getAll();

	res.status(200)
		.json(movies);
}; */

module.exports = {
	create,
	/* getAll */
}; 
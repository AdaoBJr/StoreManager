const productService = require('../service/productService');

const create = async (req, res) => {
	const { name, quantity } = req.body;

	const product = await productService.create({ name, quantity });

	if (!product) {
		return res.status(400).json({ message: 'Dados inválidos', code: 400 });
	}

	res.status(201).json({ name, quantity });
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
const productsService = require('../services/productsServices');

const CODE_INVALID_DATA = 'invalid_data';

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await productsService
    .create({ name, quantity });

  if (products === 'produtoExist') {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Product already exists' },
  });
  }
  if (products.isJoi) {
    return res.status(422)
      .send({ err: { code: CODE_INVALID_DATA, message: products.details[0].message },
      });
  }
  res.status(201)
    .json({
      _id: products.id,
      name,
      quantity,
    });
};

module.exports = {
  create,
};

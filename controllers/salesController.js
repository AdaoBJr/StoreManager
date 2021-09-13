const { servCreate } = require('../services/salesService');

const contCreate = async (req, res) => {
  const itens = req.body;
  const result = await servCreate(itens);
  if (result.err) {
    return res.status(result.code).json({ ...result });
  }
  console.log(result.err);
return res.status(result.code).json(result.itensSold);
};

module.exports = {
  contCreate,
};
const {
  servCreate,
  servListAll,
  servListByID,
} = require('../services/salesService');

const contCreate = async (req, res) => {
  const itens = req.body;
  const result = await servCreate(itens);
  if (result.err) {
    return res.status(result.code).json({ ...result });
  }
return res.status(result.code).json(result.itensSold);
};

const contListAll = async (req, res) => {
  const result = await servListAll();
  return res.status(result.code).json(result.itensSold);
};

const contListByID = async (req, res) => {
 const { id } = req.params;
 const result = await servListByID(id);
 if (result.err) {
  return res.status(result.code).json({ ...result });
}
  return res.status(result.code).json(result.itensSold);
};

module.exports = {
  contCreate,
  contListByID,
  contListAll,
};
const { createSalesServices, showsalesService } = require('../3services/sales_services');

const STATUS_OK = 200;
const VALIDATE_ERROR = 422;

const createsales = async (req, res) => {
  const answer = await createSalesServices(req.body);
  if (answer.err) { return res.status(VALIDATE_ERROR).json(answer); }
  return res.status(STATUS_OK).json(answer);
};

const showsales = async (req, res) => {
  const { id } = req.params;
  const answer = await showsalesService(id);
  console.log(answer);
  if (!answer) {
    return res.status(404)
    .json({ err: { code: 'not_found', message: 'Sale not found' } }); 
}
  return res.status(200).json(answer);
};

module.exports = {
  createsales,
  showsales,
};
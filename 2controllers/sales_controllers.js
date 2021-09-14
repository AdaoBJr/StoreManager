const { createSalesServices } = require('../3services/sales_services');

const STATUS_OK = 200;
const VALIDATE_ERROR = 422;

const createsales = async (req, res) => {
  const answer = await createSalesServices(req.body);
  if (answer.err) { return res.status(VALIDATE_ERROR).json(answer); }
  return res.status(STATUS_OK).json(answer);
};

module.exports = {
  createsales,
};
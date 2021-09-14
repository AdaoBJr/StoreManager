const BaseController = require('./Base');

class SalesController extends BaseController {
  constructor(service) {
    super(service);
    this.service = service;
    this.RootUpdateById = this.RootUpdateById.bind(this);
  }

  async RootUpdateById(req, res) {
    const { id } = req.params;
    const newValues = req.body;

    const serviceRes = await this.service.Update({ id, newValues });

    res.status(serviceRes.status).json(serviceRes.message);
  }
}

module.exports = SalesController;
const BaseController = require('./Base');

class ProductsController extends BaseController {
  constructor(service) {
    super(service);
    this.service = service;
    this.RootUpdateById = this.RootUpdateById.bind(this);
  }

  async RootUpdateById(req, res) {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const newValues = { id, name, quantity };

    const serviceRes = await this.service.Update(newValues);

    res.status(serviceRes.status).json(serviceRes.message);
  }
}

module.exports = ProductsController;

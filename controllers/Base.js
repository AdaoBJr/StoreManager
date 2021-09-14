class BaseController {
  constructor(service) {
    this.service = service;
    this.RootFindAll = this.RootFindAll.bind(this);
    this.RootFindById = this.RootFindById.bind(this);
    this.RootDeleteById = this.RootDeleteById.bind(this);
    this.RootInsert = this.RootInsert.bind(this);
  }

  async RootFindAll(_req, res) {
    const serviceRes = await this.service.FindAll();
    res.status(serviceRes.status).json(serviceRes.message);
  }

  async RootFindById(req, res) {
    const { id } = req.params;
    const serviceRes = await this.service.FindById(id);
    res.status(serviceRes.status).json(serviceRes.message);
  }

  async RootDeleteById(req, res) {
    const { id } = req.params;
    const serviceRes = await this.service.Delete(id);
    res.status(serviceRes.status).json(serviceRes.message);
  }

  async RootInsert(req, res) {
    const values = req.body;
    const salesRes = await this.service.InsertOne(values);
    res.status(salesRes.status).json(salesRes.message);
  }
}

module.exports = BaseController;

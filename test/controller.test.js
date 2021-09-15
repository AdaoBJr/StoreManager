const sinon = require("sinon");
const { expect } = require("chai");
const BaseController = require("../controllers/Base");
const ProductService = require("../services/ProductService");
const { ProductsController, SalesController } = require("../controllers");

const productService = new ProductService();
describe("testa a BaseController", () => {
  let baseController;
  const response = {};
  const request = {};

  beforeAll(() => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    const findAllRes = { status: 200, message: { products: "sou um teste" } };
    const baseC = new BaseController(productService);
    sinon.stub(baseC.service, "FindAll").callsFake(() => findAllRes);
    sinon.stub(baseC.service, "FindById").callsFake(() => findAllRes);
    sinon.stub(baseC.service, "Delete").callsFake(() => findAllRes);
    sinon.stub(baseC.service, "InsertOne").callsFake(() => findAllRes);
    baseController = baseC;
  });

  afterAll(() => {
    baseC.service.FindAll.restore;
    baseC.service.FindById.restore;
    baseC.service.Delete.restore;
    baseC.service.RootInsert.restore;
  });

  it("testa o retorno do FindAll", async () => {
    await baseController.RootFindAll(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith({ products: "sou um teste" })).to.be.equal(
      true
    );
  });

  describe("quando passado um id", () => {
    beforeAll(() => {
      request.params = { id: "300" };
    });

    it("testa o retorno do FindById", async () => {
      await baseController.RootFindById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(
        response.json.calledWith({ products: "sou um teste" })
      ).to.be.equal(true);
    });

    it("testa o retorno do DeleteById", async () => {
      await baseController.RootDeleteById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(
        response.json.calledWith({ products: "sou um teste" })
      ).to.be.equal(true);
    });

    it("testa o retorno do RootInsert", async () => {
      await baseController.RootInsert(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(
        response.json.calledWith({ products: "sou um teste" })
      ).to.be.equal(true);
    });
  });
});

describe("testa a ProductController", () => {
  let productsController;
  const response = {};
  const request = {};

  beforeAll(() => {
    request.body = { name: "teste", quantity: 400 };
    request.params = { id: 20 };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    const findAllRes = { status: 200, message: { products: "sou um teste" } };
    const product = new ProductsController(productService);
    sinon.stub(product.service, "Update").callsFake(() => findAllRes);
    productsController = product;
  });

  afterAll(() => {
    product.service.Update.restore;
  });

  it("testa o retorno do RootUpdateById quando há nome, quantidade e id", async () => {
    await productsController.RootUpdateById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith({ products: "sou um teste" })).to.be.equal(
      true
    );
  });
});

const sinon = require("sinon");
const { expect } = require("chai");
const BaseController = require("../../controllers/Base");
const ProductService = require("../../services/ProductService");
const { ProductsController, SalesController } = require("../../controllers");

const productService = new ProductService();
describe("testa os controllers", () => {
  let baseController;
  let productController;
  let salesController;
  const response = {};
  const request = {};

  before(() => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    const findAllRes = { status: 200, message: { products: "sou um teste" } };
    const baseC = new BaseController(productService);
    const productC = new ProductsController(productService);
    const salesC = new SalesController(productService);
    sinon.stub(baseC.service, "FindAll").callsFake(() => findAllRes);
    sinon.stub(baseC.service, "FindById").callsFake(() => findAllRes);
    sinon.stub(baseC.service, "Delete").callsFake(() => findAllRes);
    sinon.stub(baseC.service, "InsertOne").callsFake(() => findAllRes);
    sinon.stub(salesC.service, "Update").callsFake(() => findAllRes);
    baseController = baseC;
    productController = productC;
    salesController = salesC;
  });

  after(() => {
    baseController.service.FindAll.restore;
    baseController.service.FindById.restore;
    baseController.service.Delete.restore;
    baseController.service.InsertOne.restore;
    productController.service.Update.restore;
    salesController.service.Update.restore;
  });

  it("testa o retorno do FindAll", async () => {
    await baseController.RootFindAll(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith({ products: "sou um teste" })).to.be.equal(
      true
    );
  });

  // describe("quando passado um id e body", () => {
  //   before(() => {
  //     request.params = { id: "300" };
  //     request.body = { name: "joao", quantity: 500 };
  //   });

  //   it("deve retornar uma resposta", async () => {
  //     await productController.RootUpdateById(request, response);
  //     expect(response.status.calledWith(200)).to.be.equal(true);
  //     expect(
  //       response.json.calledWith({ products: "sou um teste" })
  //     ).to.be.equal(true);
  //   });
  // });

  describe("quando passado um id", () => {
    before(() => {
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

  describe("quando passado um id e body", () => {
    before(() => {
      request.params = { id: "300" };
      request.body = { name: "joao", quantity: 500 };
    });

    it("deve retornar uma resposta", async () => {
      await salesController.RootUpdateById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(
        response.json.calledWith({ products: "sou um teste" })
      ).to.be.equal(true);
    });
  });
});

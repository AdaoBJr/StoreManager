const sinon = require("sinon");
const { expect } = require("chai");
const { MongoClient, ObjectID } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");
const {
  Sales,
  Product,
  SalesSerializer,
  ProductSerializer,
} = require("../models");
const { ProductService, SalesService } = require("../services");
const { errorBuilder } = require("../middleware");
const { codes, messages } = require("../schemas");
const { list } = require("mongodb/lib/gridfs/grid_store");

describe("checa interação do Product Service com o Model Product", () => {
  let connectionMock;
  let productService;
  const DBServer = new MongoMemoryServer();

  const productPayload1 = { name: "Batata", quantity: 100 };
  const productPayload2 = { name: "Batatinha", quantity: 40 };

  const INVALID_ID = "613fcf1e94ae275bc2364555";

  beforeAll(async () => {
    const URLMock = await DBServer.getUri(); //
    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((conn) => conn.db("model_example")); //
    const product = new Product(
      connectionMock,
      new ProductSerializer(),
      ObjectID
    );
    productService = new ProductService(product, errorBuilder, codes, messages);
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  afterAll(async () => {
    await MongoClient.connect.restore();
    await DBServer.stop();
  });

  beforeEach(async () => {
    await connectionMock.collection("products").deleteMany({});
    await connectionMock.collection("sales").deleteMany({});
  });

  describe("tenta inserir um elemento", () => {
    it("retorna um objeto com status e message, o último contendo as informações do produto", async () => {
      const res = await productService.InsertOne(productPayload1);
      expect(res).to.haveOwnProperty("status");
      expect(res).to.haveOwnProperty("message");

      expect(res.status).to.eql(codes.CREATED);
      expect(res.message).to.haveOwnProperty("_id");
      expect(res.message).to.haveOwnProperty("name");
      expect(res.message).to.haveOwnProperty("quantity");

      expect(res.message.name).to.eql(productPayload1.name);
      expect(res.message.quantity).to.eql(productPayload1.quantity);
    });

    it("que está no banco, retornando um err.", async () => {
      await productService.InsertOne(productPayload1);
      const res = await productService.InsertOne(productPayload1);
      expect(res).to.haveOwnProperty("status");
      expect(res).to.haveOwnProperty("message");
      const status = res.status;
      const code = res.message.err.code;
      const message = res.message.err.message;

      expect(status).to.eql(codes.UNPROCESSABLE_ENTITY);
      expect(res.message).to.haveOwnProperty("err");
      expect(res.message.err).to.haveOwnProperty("code");
      expect(res.message.err).to.haveOwnProperty("message");

      expect(code).to.eql(codes.INVALID_DATA);
      expect(message).to.eql(messages.INVALID_NAME_ALREADY_EXISTS);
    });
  });

  describe("tenta buscar os produtos", () => {
    it("retorna um array vazio quando não tem nada, com status certo", async () => {
      const res = await productService.FindAll();
      expect(res).to.haveOwnProperty("status");
      expect(res).to.haveOwnProperty("message");
      expect(res.message).to.haveOwnProperty("products");

      expect(res.status).to.eql(codes.OK);
      expect(res.message.products).to.be.empty;
    });

    it("retorna uma lista em produtos, com status 201", async () => {
      await productService.InsertOne(productPayload1);
      await productService.InsertOne(productPayload2);
      const res = await productService.FindAll();
      expect(res).to.haveOwnProperty("status");
      expect(res).to.haveOwnProperty("message");
      expect(res.message).to.haveOwnProperty("products");

      expect(res.status).to.eql(codes.OK);
      expect(res.message.products).to.not.be.empty;

      expect(res.message.products).to.have.lengthOf(2);
    });
  });

  describe("tenta buscar os produtos", () => {
    it("retorna um produto ao buscar por id", async () => {
      const res = await productService.InsertOne(productPayload1);
      await productService.InsertOne(productPayload2);
      const id = res.message["_id"];
      const foundRes = await productService.FindBy(id, true);

      expect(foundRes).to.haveOwnProperty("status");
      expect(foundRes).to.haveOwnProperty("message");

      expect(foundRes.status).to.eql(codes.OK);
      expect(foundRes.message).to.haveOwnProperty("_id");
      expect(foundRes.message.name).to.eql(productPayload1.name);
      expect(foundRes.message.quantity).to.eql(productPayload1.quantity);
    });

    it("retorna um produto ao buscar por nome", async () => {
      await productService.InsertOne(productPayload1);
      await productService.InsertOne(productPayload2);
      const foundRes = await productService.FindBy(productPayload1.name);

      expect(foundRes).to.haveOwnProperty("status");
      expect(foundRes).to.haveOwnProperty("message");

      expect(foundRes.status).to.eql(codes.OK);
      expect(foundRes.message).to.haveOwnProperty("_id");
      expect(foundRes.message.name).to.eql(productPayload1.name);
      expect(foundRes.message.quantity).to.eql(productPayload1.quantity);
    });
  });

  describe("tenta deletar um produto", () => {
    it("que existe e retorna o produto deletado com o status 200", async () => {
      const res = await productService.InsertOne(productPayload1);
      const id = res.message["_id"];
      const deleteRes = await productService.Delete(id);

      expect(deleteRes).to.haveOwnProperty("status");
      expect(deleteRes).to.haveOwnProperty("message");

      expect(deleteRes.status).to.eql(codes.OK);
      expect(deleteRes.message).to.haveOwnProperty("_id");
      expect(deleteRes.message.name).to.eql(productPayload1.name);
      expect(deleteRes.message.quantity).to.eql(productPayload1.quantity);
    });

    it("que non ecxisté e retorna um error com status correto", async () => {
      const deleteRes = await productService.Delete(INVALID_ID);

      expect(deleteRes).to.haveOwnProperty("status");
      expect(deleteRes).to.haveOwnProperty("message");

      expect(deleteRes.status).to.eql(codes.UNPROCESSABLE_ENTITY);
      expect(deleteRes.message).to.haveOwnProperty("err");
    });
  });

  describe("tenta atualizar um produto", () => {
    const newVals = { name: "beterra", quantity: 20 };

    it("que existe e retorna o produto atualizado com o status correto 200", async () => {
      const res = await productService.InsertOne(productPayload1);
      const id = res.message["_id"];
      const updatedRes = await productService.Update({ id, ...newVals });

      expect(updatedRes).to.haveOwnProperty("status");
      expect(updatedRes).to.haveOwnProperty("message");

      expect(updatedRes.status).to.eql(codes.OK);
      expect(updatedRes.message).to.haveOwnProperty("_id");
      expect(updatedRes.message.name).to.eql(newVals.name);
      expect(updatedRes.message.quantity).to.eql(newVals.quantity);
    });

    it("que non ecxisté e retorna um erro com o status correto 422", async () => {
      const id = INVALID_ID;
      const updatedRes = await productService.Update({ id, ...newVals });

      expect(updatedRes).to.haveOwnProperty("status");
      expect(updatedRes).to.haveOwnProperty("message");

      const status = updatedRes.status;
      const code = updatedRes.message.err.code;
      const message = updatedRes.message.err.message;

      expect(status).to.eql(codes.UNPROCESSABLE_ENTITY);
      expect(updatedRes.message).to.haveOwnProperty("err");
      expect(updatedRes.message.err).to.haveOwnProperty("code");
      expect(updatedRes.message.err).to.haveOwnProperty("message");

      expect(code).to.eql(codes.INVALID_DATA);
      expect(message).to.eql(messages.INVALID_ID_FORMAT);
    });
  });
});

describe("checa interação do Sales Service com o Sales Model", () => {
  let connectionMock;
  let productService;
  let salesService;
  const DBServer = new MongoMemoryServer();

  const productPayload1 = { name: "Batata", quantity: 20 };
  const productPayload2 = { name: "Batatinha", quantity: 10 };

  const salesPayload1 = [
    {
      productId: "to be Defined",
      quantity: 2,
    },
    {
      productId: "to be Defined",
      quantity: 4,
    },
  ];

  const salesPayload2 = [
    {
      productId: "to be Defined",
      quantity: 4,
    },
  ];

  const INVALID_ID = "613fcf1e94ae275bc2364555";

  beforeAll(async () => {
    const URLMock = await DBServer.getUri(); //

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((conn) => conn.db("model_example")); //

    const product = new Product(
      connectionMock,
      new ProductSerializer(),
      ObjectID
    );

    const sales = new Sales(
      connectionMock,
      product,
      new SalesSerializer(),
      ObjectID
    );

    productService = new ProductService(product, errorBuilder, codes, messages);

    salesService = new SalesService({
      product,
      sales,
      messages,
      codes,
      errorBuilder,
    });

    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  beforeEach(async () => {
    const {
      message: { _id: id1 },
    } = await productService.InsertOne(productPayload1);
    const {
      message: { _id: id2 },
    } = await productService.InsertOne(productPayload2);
    salesPayload1[0].productId = id1;
    salesPayload2[0].productId = id1;
    salesPayload1[1].productId = id2;
  });

  afterAll(async () => {
    await MongoClient.connect.restore();
    await DBServer.stop();
  });

  afterEach(async () => {
    await connectionMock.collection("products").deleteMany({});
    await connectionMock.collection("sales").deleteMany({});
  });

  describe("testa a busca dos products por id", () => {
    it("retorna uma lista de arrays com ids", async () => {
      const listOfIds = await salesService.findProductsFromList(salesPayload1);
      expect(listOfIds).to.have.lengthOf(2);
    });
  });

  describe("tenta inserir uma venda", () => {
    it("retorna um objeto com status e message, o último contendo o id e vendas", async () => {
      const res = await salesService.InsertOne(salesPayload2);

      expect(res).to.haveOwnProperty("status");
      expect(res).to.haveOwnProperty("message");
      expect(res.status).to.eql(codes.OK);
      expect(res.message).to.haveOwnProperty("_id");
      expect(res.message).to.haveOwnProperty("itensSold");
    });

    it("que não tem produto na coleções produto, retornando um erro.", async () => {
      salesPayload2[0].productId = INVALID_ID;

      const res = await salesService.InsertOne(salesPayload2);
      expect(res).to.haveOwnProperty("status");
      expect(res).to.haveOwnProperty("message");
      const status = res.status;
      const code = res.message.err.code;
      const message = res.message.err.message;

      expect(status).to.eql(codes.UNPROCESSABLE_ENTITY);
      expect(res.message).to.haveOwnProperty("err");
      expect(res.message.err).to.haveOwnProperty("code");
      expect(res.message.err).to.haveOwnProperty("message");

      expect(code).to.eql(codes.INVALID_DATA);
      expect(message).to.eql(messages.INVALID_PRODUCT_ID_QUANTITY);
    });
  });

  describe("tenta buscar as vendas", () => {
    it("retorna uma lista em produtos, com status 200", async () => {
      await salesService.InsertOne(salesPayload1);
      await salesService.InsertOne(salesPayload2);
      const res = await salesService.GetAll();
      expect(res).to.haveOwnProperty("status");
      expect(res).to.haveOwnProperty("message");
      expect(res.message).to.haveOwnProperty("sales");
      expect(res.status).to.eql(codes.OK);
      expect(res.message.sales).to.have.lengthOf(2);
    });
  });

  // describe("tenta buscar os produtos", () => {
  //   it("retorna um produto ao buscar por id", async () => {
  //     const res = await productService.InsertOne(productPayload1);
  //     await productService.InsertOne(productPayload2);
  //     const id = res.message["_id"];
  //     const foundRes = await productService.FindBy(id, true);

  //     expect(foundRes).to.haveOwnProperty("status");
  //     expect(foundRes).to.haveOwnProperty("message");

  //     expect(foundRes.status).to.eql(codes.OK);
  //     expect(foundRes.message).to.haveOwnProperty("_id");
  //     expect(foundRes.message.name).to.eql(productPayload1.name);
  //     expect(foundRes.message.quantity).to.eql(productPayload1.quantity);
  //   });

  //   it("retorna um produto ao buscar por nome", async () => {
  //     await productService.InsertOne(productPayload1);
  //     await productService.InsertOne(productPayload2);
  //     const foundRes = await productService.FindBy(productPayload1.name);

  //     expect(foundRes).to.haveOwnProperty("status");
  //     expect(foundRes).to.haveOwnProperty("message");

  //     expect(foundRes.status).to.eql(codes.OK);
  //     expect(foundRes.message).to.haveOwnProperty("_id");
  //     expect(foundRes.message.name).to.eql(productPayload1.name);
  //     expect(foundRes.message.quantity).to.eql(productPayload1.quantity);
  //   });

  //   it("retorna um erro com status 422 por id que não existe", async () => {
  //     await productService.InsertOne(productPayload1);
  //     await productService.InsertOne(productPayload2);
  //     const foundRes = await productService.FindBy(INVALID_ID, true);

  //     expect(foundRes).to.haveOwnProperty("status");
  //     expect(foundRes).to.haveOwnProperty("message");

  //     expect(foundRes.status).to.eql(codes.UNPROCESSABLE_ENTITY);
  //     expect(foundRes.message).to.haveOwnProperty("err");
  //     expect(foundRes.message.err).to.haveOwnProperty("code");
  //     expect(foundRes.message.err).to.haveOwnProperty("message");
  //   });
  // });

  describe("tenta deletar um produto", () => {
    it("que existe e retorna o produto deletado com o status 200", async () => {
      const res = await salesService.InsertOne(salesPayload1);
      const id = res.message["_id"];
      const deleteRes = await salesService.Delete(id);

      expect(deleteRes).to.haveOwnProperty("status");
      expect(deleteRes).to.haveOwnProperty("message");

      expect(deleteRes.status).to.eql(codes.OK);
      expect(deleteRes.message).to.haveOwnProperty("_id");
      expect(deleteRes.message.itensSold[0].productId).to.eql(
        salesPayload1[0].productId
      );
      expect(deleteRes.message.itensSold[0].quantity).to.eql(
        salesPayload1[0].quantity
      );
    });

    it("que non ecxisté e retorna um error com status correto", async () => {
      const deleteRes = await salesService.Delete(INVALID_ID);

      expect(deleteRes).to.haveOwnProperty("status");
      expect(deleteRes).to.haveOwnProperty("message");

      expect(deleteRes.status).to.eql(codes.UNPROCESSABLE_ENTITY);
      expect(deleteRes.message).to.haveOwnProperty("err");
    });
  });

  // describe("tenta atualizar um produto", () => {
  //   const newVals = { name: "beterra", quantity: 20 };

  //   it("que existe e retorna o produto atualizado com o status correto 200", async () => {
  //     const res = await productService.InsertOne(productPayload1);
  //     const id = res.message["_id"];
  //     const updatedRes = await productService.Update({ id, ...newVals });

  //     expect(updatedRes).to.haveOwnProperty("status");
  //     expect(updatedRes).to.haveOwnProperty("message");

  //     expect(updatedRes.status).to.eql(codes.OK);
  //     expect(updatedRes.message).to.haveOwnProperty("_id");
  //     expect(updatedRes.message.name).to.eql(newVals.name);
  //     expect(updatedRes.message.quantity).to.eql(newVals.quantity);
  //   });

  //   it("que non ecxisté e retorna um erro com o status correto 422", async () => {
  //     const id = INVALID_ID;
  //     const updatedRes = await productService.Update({ id, ...newVals });

  //     expect(updatedRes).to.haveOwnProperty("status");
  //     expect(updatedRes).to.haveOwnProperty("message");

  //     const status = updatedRes.status;
  //     const code = updatedRes.message.err.code;
  //     const message = updatedRes.message.err.message;

  //     expect(status).to.eql(codes.UNPROCESSABLE_ENTITY);
  //     expect(updatedRes.message).to.haveOwnProperty("err");
  //     expect(updatedRes.message.err).to.haveOwnProperty("code");
  //     expect(updatedRes.message.err).to.haveOwnProperty("message");

  //     expect(code).to.eql(codes.INVALID_DATA);
  //     expect(message).to.eql(messages.INVALID_ID_FORMAT);
  //   });
  // });
});

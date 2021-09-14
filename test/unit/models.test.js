const sinon = require("sinon");
const { expect } = require("chai");
const { MongoClient, ObjectID } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

const { SalesSerializer, ProductSerializer } = require("../../models");
const {
  updateFromPreviousValues,
  updateValuesFromDelete,
} = require("../../models/helper/salesHelper");
const { Sales, Product } = require("../../models");

describe("checa interação do model product no BD", () => {
  const productPayloadOne = {
    name: "batata",
    quantity: 100,
  };

  const productPayloadTwo = {
    name: "beterraba",
    quantity: 100,
  };

  const invalidId = "613fcf1e94ae275bc2364555";

  let connectionMock;
  let product;
  const DBServer = new MongoMemoryServer();

  beforeAll(async () => {
    const URLMock = await DBServer.getUri(); //
    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((conn) => conn.db("model_example")); //
    product = new Product(connectionMock, new ProductSerializer(), ObjectID);
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

  describe("quando é inserido com sucesso", () => {
    it("retorna um objeto", async () => {
      const response = await product.InsertOne(productPayloadOne);

      expect(response).to.be.a("object");
    });

    it("retorna um objeto com id, nome, quantidade", async () => {
      const response = await product.InsertOne(productPayloadOne);

      expect(response).to.have.a.property("_id");
      expect(response).to.have.a.property("quantity");
      expect(response).to.have.a.property("name");
    });

    it("deve existir um produto cadastrado", async () => {
      await product.InsertOne(productPayloadOne);
      const productList = await product.FindAll();
      expect(productList).to.be.not.null;

      expect(productList.length).to.be.greaterThan(0);
    });
  });

  describe("quanto insere mais de um produto.", () => {
    it("deve retornar 3 produtos ao inserir 3", async () => {
      await product.InsertOne(productPayloadOne);
      await product.InsertOne(productPayloadOne);
      await product.InsertOne(productPayloadOne);

      const productList = await product.FindAll();
      expect(productList.length).to.be.eq(3);
    });
  });

  describe("quando há pelo menos 1 produto", () => {
    beforeEach(async () => {
      await product.InsertOne(productPayloadOne);
      await product.InsertOne(productPayloadTwo);
    });

    it("deve ser possivel buscar pelo id", async () => {
      const productList = await product.FindAll();
      const { _id } = productList[1];
      const foundProduct = await product.FindById(_id);

      expect(foundProduct).to.have.a.property("_id");
      expect(foundProduct.name).to.be.eq(productPayloadTwo.name);
      expect(foundProduct.quantity).to.be.eq(productPayloadTwo.quantity);
    });

    it("deve dar retornar null quando buscar por um id não existente", async () => {
      const foundProduct = await product.FindById("613fcf1e94ae275bc2364555");
      expect(foundProduct).to.be.null;
    });

    it("deve dar retornar um produto ao buscar pelo nome", async () => {
      const foundProduct = await product.FindByName(productPayloadOne.name);
      expect(foundProduct).to.not.be.null;
      const { name, quantity } = foundProduct;
      expect(name).to.be.eq(productPayloadOne.name);
      expect(quantity).to.be.eq(productPayloadOne.quantity);
    });

    it("deve retornar null ao buscar por um nome invalido", async () => {
      const notFound = await product.FindByName("nomenãoexistente");
      expect(notFound).to.be.null;
    });
  });

  describe("quando há pelo menos 1 produto", () => {
    it("deve ser possivel atualizar o produto.", async () => {
      const insertedProduct = await product.InsertOne(productPayloadOne);

      const newValues = {
        id: insertedProduct["_id"],
        name: "pepe",
        quantity: 20,
      };

      await product.Update(newValues);
      const foundElement = await product.FindByName("pepe");

      expect(foundElement).to.not.be.null;
      expect(foundElement["_id"].toString()).to.be.eq(newValues.id.toString());
      expect(foundElement.name).to.be.eq(newValues.name);
      expect(foundElement.quantity).to.be.eq(newValues.quantity);
    });

    it("não deve ser possivel atualizar o produto que não existe.", async () => {
      await product.InsertOne(productPayloadOne);
      const newValues = { id: invalidId, name: "popo", quantity: 30 };
      await product.Update(newValues);
      const foundElement = await product.FindByName("popo");

      expect(foundElement).to.be.null;
    });

    it("deve ser possivel deletar um produto.", async () => {
      const { _id } = await product.InsertOne(productPayloadOne);
      const elements = await product.FindAll();

      expect(elements.length).to.be.eq(1);

      await product.Delete(_id);

      const noElements = await product.FindAll();

      expect(noElements.length).to.be.eq(0);
    });
  });
});

describe("checa interação do model sales no BD", () => {
  const productPayloadOne = {
    name: "batata",
    quantity: 100,
  };

  const productPayloadTwo = {
    name: "Beterraba",
    quantity: 30,
  };

  const salesPayloadOne = [
    {
      productId: "toBeDefined",
      quantity: 2,
    },
  ];

  const salesPayloadTwo = [
    {
      productId: "toBeDefined",
      quantity: 7,
    },

    {
      productId: "toBeDefined",
      quantity: 5,
    },
  ];

  const invalidId = "613fcf1e94ae275bc2364555";

  let connectionMock;
  let sales;
  let product;
  const DBServer = new MongoMemoryServer();

  beforeAll(async () => {
    const URLMock = await DBServer.getUri(); //
    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((conn) => conn.db("model_example")); //
    product = new Product(connectionMock, new ProductSerializer(), ObjectID);
    sales = new Sales(connectionMock, product, new SalesSerializer(), ObjectID);
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  afterAll(async () => {
    await MongoClient.connect.restore();
    await DBServer.stop();
  });

  beforeEach(async () => {
    await connectionMock.collection("sales").deleteMany({});
    await connectionMock.collection("products").deleteMany({});
    const { _id: idOne } = await product.InsertOne(productPayloadOne);
    const { _id: idTwo } = await product.InsertOne(productPayloadTwo);
    salesPayloadOne[0].productId = idOne;
    salesPayloadTwo[0].productId = idOne;
    salesPayloadTwo[1].productId = idTwo;
  });

  describe("quando é inserido com sucesso", () => {
    it("retorna um objeto", async () => {
      const response = await sales.InsertOne(salesPayloadOne);

      expect(response).to.be.a("object");
    });

    it("retorna um objeto com id e itensSold", async () => {
      const response = await sales.InsertOne(salesPayloadOne);
      expect(response).to.have.a.property("_id");
      expect(response).to.have.a.property("itensSold");
    });

    it("deve existir uma venda cadastrada", async () => {
      await sales.InsertOne(salesPayloadOne);
      const salesList = await sales.GetAll();
      expect(salesList).to.be.not.null;
      expect(salesList.length).to.be.greaterThan(0);
    });
  });

  describe("quando insere mais de uma venda.", () => {
    it("deve retornar 2 vendas ao inserir 2 vendas", async () => {
      await sales.InsertOne(salesPayloadOne);
      await sales.InsertOne(salesPayloadTwo);

      const salesList = await sales.GetAll();
      expect(salesList).to.have.lengthOf(2);
    });
  });

  describe("quando há pelo menos 1 venda", () => {
    beforeEach(async () => {
      await sales.InsertOne(salesPayloadOne);
      await sales.InsertOne(salesPayloadTwo);
    });

    it("deve ser possivel buscar pelo id", async () => {
      const salesList = await sales.GetAll();
      const { _id } = salesList[0];
      const foundSales = await sales.FindById(_id);
      expect(foundSales).to.have.a.property("_id");
      expect(foundSales.itensSold).not.be.null;
      expect(foundSales.itensSold[0]).to.eql(salesPayloadOne[0]);
    });

    it("deve dar retornar null quando buscar por um id não existente", async () => {
      const salesProduct = await sales.FindById("613fcf1e94ae275bc2364555");
      expect(salesProduct).to.be.null;
    });
  });

  describe("quando há pelo menos uma venda", () => {
    // it("deve ser possivel atualizar a venda.", async () => {
    //   const insertedProduct = await product.InsertOne(productPayloadOne);

    //   const newValues = {
    //     id: insertedProduct["_id"],
    //     name: "pepe",
    //     quantity: 20,
    //   };

    //   await product.Update(newValues);
    //   const foundElement = await product.FindByName("pepe");

    //   expect(foundElement).to.not.be.null;
    //   expect(foundElement["_id"].toString()).to.be.eq(newValues.id.toString());
    //   expect(foundElement.name).to.be.eq(newValues.name);
    //   expect(foundElement.quantity).to.be.eq(newValues.quantity);
    // });

    // it("não deve ser possivel atualizar a venda que não existe.", async () => {
    //   await product.InsertOne(productPayloadOne);
    //   const newValues = { id: invalidId, name: "popo", quantity: 30 };
    //   await product.Update(newValues);
    //   const foundElement = await product.FindByName("popo");

    //   expect(foundElement).to.be.null;
    // });

    it("deve ser possivel deletar uma venda.", async () => {
      const { _id } = await sales.InsertOne(salesPayloadOne);
      const products = await product.FindAll();
      console.log(products);
      const elements = await sales.GetAll();

      expect(elements.length).to.be.eq(1);
      console.log(salesPayloadOne);
      await sales.Delete(_id, { itensSold: salesPayloadOne });

      const noElements = await sales.GetAll();

      expect(noElements.length).to.be.eq(0);
    });
  });
});

describe("checa os serializers", () => {
  const productPayloadOne = {
    name: "batata",
    quantity: 100,
  };

  let connectionMock;
  let productSerializer;
  let salesSerializer;
  const DBServer = new MongoMemoryServer();

  beforeAll(async () => {
    const URLMock = await DBServer.getUri(); //
    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((conn) => conn.db("model_example")); //
    productSerializer = new ProductSerializer();
    salesSerializer = new SalesSerializer();
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

  describe("verificar o serializador de produto", () => {
    it("verifica se retorna _id, name e quantity com o método All", async () => {
      const result = await connectionMock
        .collection("products")
        .insertOne(productPayloadOne);

      const serializedProduct = productSerializer.All(result.ops[0]);

      expect(serializedProduct).to.have.property("_id");
      expect(serializedProduct).to.have.property("name");
      expect(serializedProduct).to.have.property("quantity");
    });

    it("verifica se atualiza a classe com os devidos valores ao usar o método serialize", async () => {
      const result = await connectionMock
        .collection("products")
        .insertOne(productPayloadOne);

      productSerializer.Serialize(result.ops[0]);

      expect(productSerializer.id).to.not.be.null;
      expect(productSerializer.name).to.not.be.null;
      expect(productSerializer.name).equals(productPayloadOne.name);
      expect(productSerializer.quantity).to.not.be.null;
      expect(productSerializer.quantity).equals(productPayloadOne.quantity);
    });
  });

  describe("verificar o serializador de sales", () => {
    const itensList = [
      {
        productId: "613d0a9a052b4ca8d1b4d0f0",
        quantity: 2,
      },
      {
        productId: "613d0a9d052b4ca8d1b4d0f1",
        quantity: 4,
      },
    ];
    const query = { itensSold: itensList };

    it("verifica se retorna _id e itensSold com o método All", async () => {
      const result = await connectionMock.collection("sales").insertOne(query);
      const serializedSales = salesSerializer.All(result.ops[0]);

      expect(serializedSales).to.have.property("_id");
      expect(serializedSales).to.have.property("itensSold");
      expect(serializedSales.itensSold).to.have.lengthOf(2);
      expect(serializedSales.itensSold[0].productId).equals(
        itensList[0].productId
      );
      expect(serializedSales.itensSold[0].quantity).equals(
        itensList[0].quantity
      );
    });

    it("verifica se atualiza a classe com os devidos valores ao usar o método serialize", async () => {
      const result = await connectionMock.collection("sales").insertOne(query);

      salesSerializer.Serialize(result.ops[0]);
      expect(salesSerializer.id).to.not.be.null;
      expect(salesSerializer.itensSold).to.not.be.null;
      expect(salesSerializer.itensSold).to.have.lengthOf(2);
      expect(salesSerializer.itensSold[0].productId).equals(
        itensList[0].productId
      );
      expect(salesSerializer.itensSold[0].quantity).equals(
        itensList[0].quantity
      );
    });
  });
});

describe("checa o salesHelper", () => {
  const sales = {
    itensSold: [
      {
        productId: "613fe4b68a3dcbcf90d3d4ed",
        quantity: 2,
      },
    ],
  };

  const updatedSales = [
    {
      productId: "613fe4b68a3dcbcf90d3d4ed",
      quantity: 6,
    },
  ];

  it("deve trazer um valor atualizado para ser passado para o mongo", () => {
    const values = updateFromPreviousValues(updatedSales, sales);
    const { productId, quantity } = values[0];
    expect(values[0]).to.haveOwnProperty("productId");
    expect(values[0]).to.haveOwnProperty("quantity");
    expect(productId).to.not.be.null;
    expect(quantity).to.not.be.null;
    expect(productId).equals(updatedSales[0].productId);
    expect(quantity).equals(4);
  });

  it("deve trazer um valor atualizado para ser passado para o mongo quando um item for deletado", () => {
    const values = updateValuesFromDelete(sales);
    const { productId, quantity } = values[0];

    expect(values[0]).to.haveOwnProperty("productId");
    expect(values[0]).to.haveOwnProperty("quantity");
    expect(productId).to.not.be.null;
    expect(quantity).to.not.be.null;
    expect(productId).equals(updatedSales[0].productId);
    expect(quantity).equals(-2);
  });
});

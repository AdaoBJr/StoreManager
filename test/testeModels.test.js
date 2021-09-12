const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectID } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Product = require("../model/Product");
const ProductSerializer = require('../model/Serializer/ProductSerializer')

describe('Insere um novo produto no BD', () => {
  const productPayload = {
    "name": "P5dsadee",
    "quantity": 100
  }

  let connectionMock;
  let product;
  const DBServer = new MongoMemoryServer();

  beforeAll(async () => {
    const URLMock = await DBServer.getUri();// 
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db('model_example'));// 
     product = new Product(connectionMock, new ProductSerializer(), ObjectID )
     sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterAll(async () => {
    await MongoClient.connect.restore();
    await DBServer.stop()
  });

  beforeEach(async () => {
    await connectionMock.collection('products').deleteMany({});
    await connectionMock.collection('sales').deleteMany({});
  })

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await product.InsertOne(productPayload);

      expect(response).to.be.a("object");
    });

    it('ao inserir um filme, retorna um objeto com id, nome, quantidade', async () => {
      const response = await product.InsertOne(productPayload);

      expect(response).to.have.a.property('_id');
      expect(response).to.have.a.property('quantity');
      expect(response).to.have.a.property('name');
    });

    it('deve existir um produto cadastrado', async () => {
      await product.InsertOne(productPayload);
      const productList = await product.FindAll()
      expect(productList).to.be.not.null;
      console.log(productList)
      expect(productList.length).to.be.greaterThan(0);
    });
  });

});

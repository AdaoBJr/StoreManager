const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productsModel = require('../../models/productsModel')

describe('product - createProduct', () => {
  let connectionMock;
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  const DBServer = new MongoMemoryServer();

  beforeEach(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, OPTIONS)
      .then((conn) => conn.db('StoreManager'));

      sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
  })

  // afterEach(async () => {
  //   await DBServer.stop();
  //   await mongoConnection.connection.restore();
  //   await productsModel.dropProducts();
  // })

  describe('ao inserir certo produto', () => {
    it('deve conter certo produto ao ser inserido', async () => {
      await productsModel.create('ProdutoAleatorio', 90);
      const response = await productsModel.getAll();
      const product = {
        name: 'ProdutoAleatorio',
        quantity: 90,
      }
      expect(response).to.be.an('array');

      const [ responseObj ] = response;
      expect(responseObj).to.have.property('_id');
      expect(responseObj).to.have.property('name').to.equal(product.name);
      expect(responseObj).to.have.property('quantity').to.equal(product.quantity);
    })
  })
});
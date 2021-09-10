const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');


const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const ProductModel = require('../../models/ProductModels')

describe('Validações para a rota "/products"', () => {
  const id = ObjectId('604cb554311d68f491ba5781');

  let connectionMock;
  const DBServe = new MongoMemoryServer();

  before(async () => {
    const URLMock = await DBServe.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db('model_example'));

    sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
  });

  after(async () => {
    mongoConnection.connection.restore();
    await DBServe.stop();
  });

  describe('Listar todos os produtos', () => {
    before(async () => {
      const products =  {
        _id: id,
        name: "Produto teste",
        quantity: 1,
      }
      const db = await mongoConnection.connection();
      await db.collection('products').insertOne(products);
    });

    after(async () => {
      const db = await mongoConnection.connection();
      await db.collection('products').drop();
    })

    it('Verifica se retorna um objeto', async () => {
      const response = await ProductModel.getAll();
      expect(response).to.be.an('object');
    });

    it('Verifica se a lista de produtos é um array', async () => {
      const response = await ProductModel.getAll();
      expect(response.products).to.be.an('array');
    });

    it('Verifica se retorna todos os produtos', async () => {
      const response = await ProductModel.getAll()
      expect(response.products[0]).to.be.includes.keys('_id', 'name', 'quantity');

    })
  });

  describe('Buscar um produto por ID', () => {
    it('Quando não existe o produto cadastrado', async () => {
      const response = await ProductModel.findById(id);
      expect(response).to.be.null;
    });

    describe('Quando existe produto cadastrado', async () => {
      const products =  {
        _id: id,
        name: "Produto teste",
        quantity: 1,
      }
      before(async () => {
        const db = await mongoConnection.connection();
        await db.collection('products').insertOne(products);
      });

      after(async () => {
        const db = await mongoConnection.connection();
        await db.collection('products').drop();

      });

      it('Verifica se retorna um objeto', async () => {
        const response = await ProductModel.findById(id);
        expect(response).to.be.an('object');
      });

      it('Verfica se retorna um determinado produto pelo ID', async () => {
        const response = await ProductModel.findById(id);
        expect(response).to.deep.equals(products);
      })
    });
  });

  describe.skip('Criar um produto', () => {

  });

  describe.skip('Atualizar um produto', () => {

  });

  describe.skip('Deletar um produto', () => {

  });
});

describe.skip('Validações para a rota "/sales"', () => {

});

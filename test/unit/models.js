const { MongoMemoryServer } = require
('mongodb-memory-server-core');
const { MongoClient, ObjectId } = require('mongodb');
const sinon = require('sinon');
const { expect } = require('chai');

const mongoConnection = require('../../model/connection')
const productsModel = require('../../model/productsModel')

describe('Testa a conexão do servidor', () => {
  it('Servidor online após conectar', async() => {
      const collections = await mongoConnection.connection()
      .then(async (db) => db.listCollections().toArray())
      .catch(err => {
        console.error(err);
        process.exit(1);
      })
      
      expect(collections).to.be.an('array')
  })
})

describe('Insere um novo produto no BD', () => {
	const newProduct = {
    name: "UmProduto",
    quantity: 100
  }

  let DBServer = new MongoMemoryServer();
  let connectionMock;
  
  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.
    connect(URLMock, {
      useNewUrlParser: true,
			useUnifiedTopology: true,
    })
    .then(conn => conn.db('StoreManager'));

    sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
  })

  after(async () => {
    sinon.restore()
	});

  describe('Quando é inserido com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await productsModel.create(newProduct.name, newProduct.quantity)
      expect(response).to.be.a('object');
    })

    it('O objeto possui o "id" do novo produto', async () => {
      const getOne = await connectionMock.collection('products').findOne({})

      expect(getOne).to.have.a.property('_id');
    });

    it('Encontra o produto no banco de dados', async () => {
      const found = await productsModel.findByName(newProduct.name)
      expect(found).to.be.true;
    })
  })
});

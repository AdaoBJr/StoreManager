const { MongoMemoryServer } = require
('mongodb-memory-server-core');
const { MongoClient, ObjectId } = require('mongodb');
const sinon = require('sinon');
const { expect } = require('chai');

const mongoConnection = require('../../models/connection')
const productsModel = require('../../models/productsModel')

describe('Testa a conexão do servidor', () => {
  it('Conecta ao db com url correta', async() => {
      const collections = await mongoConnection.connection()
      .then(async (db) => db.listCollections().toArray())
      .catch(err => {
        console.error(err);
      })

      expect(collections).to.be.an('array')
  })

  it('Não conecta ao db com url incorreta', async() => {
    const URL = 'maogodb://mongodb:27017/StoreManager'
    const collections = await mongoConnection.connection(URL)
    .catch(err => {
      return new Error('Não foi possivel acessar o db')
    })

    expect(collections).to.be.an('error');
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
    await mongoConnection.connection.restore();
    sinon.restore();
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

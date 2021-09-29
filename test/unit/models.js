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
  //Ainda não consegui entender como vou testar o catch da connection, o avaliador buga se eu passar uma string errada
  // it('Não conecta ao db com url incorreta', async() => {
  //   const URL = 'maogodb://mongodb:27017/StoreManager'
  //   const collections = await mongoConnection.connection(URL)
  //   .catch(err => {
  //     return new Error('Não foi possivel acessar o db')
  //   })

  //   expect(collections).to.be.an('error');
  // })
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
      expect(found).to.have.a.property('_id')
    })
  })
});

describe('Busca por produtos cadastrados no db', () => {
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
	});

  it('Retorna todos os produtos', async () => {
    await productsModel.create("Primeiro Produto", 100)
    const allProducts = await productsModel.getAllProducts()

    expect(allProducts.products).to.be.an('array').not.empty;
  })

  it('Retorna um produto', async () => {
    const oneProduct = await productsModel.findByName("Primeiro Produto")
    const foundById = await productsModel.findById(oneProduct._id)

    expect(foundById).to.have.a.property('_id');
    expect(foundById.name).to.equal("Primeiro Produto");
  })

  it('Atualiza um produto', async () => {
    const newName = "Novo produto"
    const newQuantity = 500
    const oneProduct = await productsModel.findByName("Primeiro Produto")
    await productsModel.updateOne(oneProduct._id, newName, newQuantity)
    const foundById = await productsModel.findById(oneProduct._id)

    expect(foundById).to.have.a.property('_id');
    expect(foundById.name).to.equal(newName);
  })
})

describe('Testa se está deletando um produto', () => {
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
	});
  it('Deleta o produto se ele existir', async () => {
    await productsModel.create("Um produto", 10)
    const oneProduct = await productsModel.findByName("Um produto")
    const deletedQuantity = await productsModel.deleteProduct(oneProduct._id)

    expect(deletedQuantity).to.equal(1)
  })

  it('Retorna 0 se o produto não existir', async () => {
    
  })
})

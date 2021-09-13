const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const SalesModel = require('../../models/sales');
const ProductsModel = require('../../models/products')

describe('products - getAll', () => {
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

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await ProductsModel.dropProducts();
  })

  describe('ao executar o getAll', () => {
    it('retorna um objeto', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.a('array');
    });
  
    it(
      'a chave products deve ser um array vazio quando o DB é vazio',
      async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.an('array').that.is.empty;
    });
  })
});

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

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await ProductsModel.dropProducts();
  })

  describe('ao inserir certo produto', () => {
    it('deve conter certo produto ao ser inserido', async () => {
      await ProductsModel.createProduct('ProdutoAleatorio', 90);
      const response = await ProductsModel.getAll();
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

describe('product - getById', () => {
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

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await ProductsModel.dropProducts();
  })

  it('quando passado um id, deve retornar um produto', async () => {
    const { insertedId } = await ProductsModel.createProduct('ProdutoAleatorio', 90);
    const response = await ProductsModel.getById(insertedId);
    const product = {
      _id: insertedId,
      'name': 'ProdutoAleatorio',
      'quantity': 90
    }
    expect(response).to.deep.equal(product);
  });
});

describe('product - getByName', () => {
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

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await ProductsModel.dropProducts();
  })

  it('Deve retornar o produto correto ao buscar pelo nome', async () => {
    const { insertedId } = await ProductsModel.createProduct('ProdutoAleatorio', 90);
    const produto = {
      _id: insertedId,
      'name': 'ProdutoAleatorio',
      'quantity': 90
    };
    const response = await ProductsModel.getByName(produto.name);
    expect(response).to.deep.equal(produto);
  });
});

describe('product - deleteById', () => {
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

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await ProductsModel.dropProducts();
  })

  it('deve deletar um objeto quando ordenade', async () => {
    const { insertedId } = await ProductsModel.createProduct('ProdutoAleatorio', 90);
    await ProductsModel.deleteById(insertedId);
    const response = await ProductsModel.getAll();
    expect(response).to.have.length(0);
  })
})

describe('product - editProduct', () => {
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

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await ProductsModel.dropProducts();
  })
  it('deve editar um recurso do DB com sucesso', async () => {
    const oldProduct = {
      name: 'produtoAleatorio',
      quantity: 90,
    }
    const { insertedId } = await ProductsModel.createProduct(oldProduct.name, oldProduct.quantity);
    oldProduct['id'] = insertedId;

    const newProduct = {
      name: 'outroNome',
      quantity: 5,
    }

    await ProductsModel.editProduct(oldProduct.id, newProduct.name, newProduct.quantity);
    const [response] = await ProductsModel.getAll(); 
    expect(response).to.have.property('name');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('quantity');

    expect(response.name).to.be.equal(newProduct.name);
    expect(response.quantity).to.be.equal(newProduct.quantity);
  })
})

describe('product - decreaseProductQuantity & increaseProductQuantity', () => {
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

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await ProductsModel.dropProducts();
  })

  it('deve diminuir a quantidade de um produto', async () => {
    const { insertedId } = await ProductsModel.createProduct('produtoAleatorio', 90);
    const product = {
      id: insertedId,
      name: 'produtoAleatorio',
      quantity: 90,
    }
    await ProductsModel.decreaseProductQuantity(product.id, 5);
    const [response] = await ProductsModel.getAll();
    expect(response.quantity).to.equal(product.quantity - 5);
  })

  it('deve aumentar a quantidade de um produto', async () => {
    const { insertedId } = await ProductsModel.createProduct('produtoAleatorio', 90);
    const product = {
      id: insertedId,
      name: 'produtoAleatorio',
      quantity: 90,
    }
    await ProductsModel.increaseProductQuantity(product.id, 5);
    const [response] = await ProductsModel.getAll();
    expect(response.quantity).to.equal(product.quantity + 5);
  })

})

describe('products - dropProducts', () => {
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

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await ProductsModel.dropProducts();
  })

  it('deve dropar todos os itens do banco de dados', async () => {
    await ProductsModel.createProduct('produtoAleatorio', 90)
    await ProductsModel.createProduct('produtoAleatorio2', 50);
    await ProductsModel.dropProducts();
    const response = await ProductsModel.getAll();
    expect(response).to.be.empty;
  })
})

describe('sales - getAllSales', () => {
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

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await SalesModel.dropSales();
  })

  it('deve retornar todas as vendas', async () => {
    const response = await SalesModel.getAllSales();
    expect(response).to.be.empty;
  })

})

describe('sales - createSales', () => {
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

    await ProductsModel.createProduct('produtoAleatorio', 90)
    await ProductsModel.createProduct('produtoAleatorio2', 80)
    await ProductsModel.createProduct('produtoAleatorio3', 70)
  })

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await SalesModel.dropSales();
  })

  it('deve criar vendas corretamente', async () => {
    const products = await ProductsModel.getAll();
    const sale = {
      productId: products[0]._id,
      quantity: 45,
    }
    await SalesModel.createSales([sale]);
    const response = await SalesModel.getAllSales();
    expect(response).to.be.an('array').and.have.lengthOf(1);
    expect(response[0]).to.be.an('object')
      .and.have.property('quantity')
    expect(response[0]).to.have.property('productId');
    expect(response[0].quantity).to.be.equal(sale.quantity);
    expect(response[0].productId).to.be.deep.equal(sale.productId);
  })
})

describe('sales - getById', () => {
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

    await ProductsModel.createProduct('produtoAleatorio', 90)
    await ProductsModel.createProduct('produtoAleatorio2', 80)
    await ProductsModel.createProduct('produtoAleatorio3', 70)
  })

  afterEach(async () => {
    await DBServer.stop();
    await mongoConnection.connection.restore();
    await SalesModel.dropSales();
  })

  it('deve retornar a venda correta', async () => {
    const products = await ProductsModel.getAll();
    const addedSale = {
      productId: products[0]._id,
      quantity: 45,
    }
    const { ops } = await SalesModel.createSales([addedSale]);
    const [insertedSale] = ops;
    const sale = await SalesModel.getById(insertedSale._id);
    expect(sale).to.have.property('productId');
    expect(sale).to.have.property('quantity');
    expect(sale.productId).to.be.deep.equal(addedSale.productId);
    expect(sale.quantity).to.be.deep.equal(addedSale.quantity);
  })
})

describe('sales - dropSale', () => {
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

    await ProductsModel.createProduct('produtoAleatorio', 90)
    await ProductsModel.createProduct('produtoAleatorio2', 80)
    await ProductsModel.createProduct('produtoAleatorio3', 70)
  })

  afterEach(async () => {
    await SalesModel.dropSales();
    await mongoConnection.connection.restore();
    await DBServer.stop();
  })

  it('deve dropar todo o banco de dados de sales', async () => {
    const products = await ProductsModel.getAll();
    await SalesModel.createSales(products);
    const populedDB = await SalesModel.getAllSales();
    expect(populedDB).not.to.be.empty;
    await SalesModel.dropSales();
    const emptyDB = await SalesModel.getAllSales();
    expect(emptyDB).to.be.empty;
  });
})

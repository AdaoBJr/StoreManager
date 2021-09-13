const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');


const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const ProductModel = require('../../models/ProductModels');
const SaleModel = require('../../models/SaleModel');

describe('Models - Validações para a rota "/products"', () => {
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

    it('Quando é inserido um id incorreto', async () => {
      const response = await ProductModel.findById('604cb554311d68f491ba5dfghh');
      expect(response).to.be.null;
    })

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

  describe('Criar um produto', () => {
    const products =  {
      name: "Produto teste",
      quantity: 1,
    }
    it('Verifica se é retornado as propriedades inseridas', async () => {
      const response = await ProductModel.create(products)
      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });

  describe('Buscar por nome', () => {
    it('Quando não existe o produto cadastrado', async () => {
      const response = await ProductModel.findByName('Nome Teste');
      expect(response).to.be.null;
    });
    describe('Quando existe um produto cadastrado', () => {
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
      it('Retorna o produto cadastrado', async () => {
        const response = await ProductModel.findByName("Produto teste");
        expect(response).to.deep.equals(products);
      })
    })
  })

  describe('Atualizar um produto', () => {
    const products =  {
      _id: id,
      name: "Produto teste",
      quantity: 1,
    }

    const updateProduct = {
      _id: id,
      name: "Produto atualizado",
      quantity: 5,
    }
    before(async () => {
      const db = await mongoConnection.connection();
      await db.collection('products').insertOne(products);
    });

    after(async () => {
      const db = await mongoConnection.connection();
      await db.collection('products').drop();
    });

    it('Quando é inserido um id incorreto', async () => {
      const _id = '604cb554311d68f491ba5dfghh'
      const { name, quantity } = updateProduct;
      const response = await ProductModel.update(_id, { name, quantity });
      expect(response).to.be.null;
    });

    it('Verifica se retorna os dados atualizados', async () => {
      const { _id, name, quantity } = updateProduct;
      const response = await ProductModel.update(_id, { name, quantity });
      expect(response).to.deep.equals(updateProduct);
    });
  });

  describe('Deletar um produto', () => {
    const products =  {
      _id: id,
      name: "Produto teste",
      quantity: 1,
    }
    beforeEach(async () => {
      const db = await mongoConnection.connection();
      await db.collection('products').insertOne(products);
    });

    afterEach(async () => {
      const db = await mongoConnection.connection();
      await db.collection('products').drop();
    });

    it('Verifica se retorna o produto deletado', async () => {
      const response = await ProductModel.exclude(id);
      expect(response).to.deep.equals(products);
    });

    it('Verifica se o produto é deletado com suceso', async () => {
      await ProductModel.exclude(id);

      const db = await mongoConnection.connection();
      const response = await db.collection('products').findOne({_id: id});
      expect(response).to.be.null;
    });

    it('Quando é inserido um id incorreto', async () => {
      const response = await ProductModel.exclude('604cb554311d68f491ba5dfghh');
      expect(response).to.be.null;
    })
  });
});

describe('Models - Validações para a rota "/sales"', () => {
  const id = ObjectId('604cb554311d68f491ba5781');
  const saleId = ObjectId("5f43cbf4c45ff5104986e81d");

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

  describe('Listar todos as vendas', () => {
    before(async () => {
      const saleProducts =  [
        {
          productId: id,
          quantity: 2,
        }
      ]
      const db = await mongoConnection.connection();
      await db.collection('sales').insertOne({itensSold: saleProducts});
    });

    after(async () => {
      const db = await mongoConnection.connection();
      await db.collection('sales').drop();
    })

    it('Verifica se retorna um objeto', async () => {
      const response = await SaleModel.getAll();
      expect(response).to.be.an('object');
    });

    it('Verifica se a lista de vendas é um array', async () => {
      const response = await SaleModel.getAll();
      expect(response.sales[0].itensSold).to.be.an('array');
    });

    it('Verifica se retorna todas as vendas', async () => {
      const response = await SaleModel.getAll()
      expect(response.sales[0]).to.be.includes.keys('_id', 'itensSold');
    })
  });

  describe('Buscar um produto por ID', () => {
    it('Quando não existe venda cadastrada', async () => {
      const response = await SaleModel.findById(saleId);
      expect(response).to.be.null;
    });

    it('Quando é inserido um id incorreto', async () => {
      const response = await SaleModel.findById('604cb554311d68f491ba5dfghh');
      expect(response).to.be.null;
    });

    describe('Quando existe uma venda cadastrada', async () => {
      const products = {
        _id: saleId,
        itensSold: [
          {
            productId: id,
            quantity: 2,
          }
        ]
      }
      before(async () => {
        const db = await mongoConnection.connection();
        await db.collection('sales').insertOne(products);
      });

      after(async () => {
        const db = await mongoConnection.connection();
        await db.collection('sales').drop();

      });

      it('Verifica se retorna um objeto', async () => {
        const response = await SaleModel.findById(saleId);
        expect(response).to.be.an('object');
      });

      it('Verfica se retorna uma determinada venda pelo ID', async () => {
        const response = await SaleModel.findById(saleId);
        expect(response).to.deep.equals(products);
      })
    });
  });

  describe('Criar um produto', () => {
    const saleProducts = [
        {
          productId: id,
          quantity: 2,
        }
      ]

    it('Verifica se é retornado as propriedades inseridas', async () => {
      console.log()
      const response = await SaleModel.create(saleProducts)
      expect(response).to.include.all.keys('_id', 'itensSold');
    })

  });

  describe('Atualizar uma venda', () => {
    const sale = {
      _id: saleId,
      itensSold: [
        {
          productId: id,
          quantity: 2,
        }
      ]
    }
    before(async () => {
      const db = await mongoConnection.connection();
      await db.collection('sales').insertOne(sale);
    });

    after(async () => {
      const db = await mongoConnection.connection();
      await db.collection('sales').drop();
    });

    it('Verifica se retorna os dados atualizados', async () => {
      const updateSale = [
        {
        productId: id,
        quantity: 5,
        }
      ]
      const { _id } = sale;
      const response = await SaleModel.update(_id, updateSale);
      expect(response).to.deep.equals({_id: saleId, itensSold: updateSale});
    });

    it('Quando é inserido um id incorreto', async () => {
      const updateSale = [
        {
        productId: id,
        quantity: 5,
        }
      ]
      const response = await SaleModel.update('604cb554311d68f491ba5dfghh', updateSale);
      expect(response).to.be.null;
    })
  });

  describe('Deletar um produto', () => {

    const saleProducts = {
      _id: saleId,
      itensSold: [
        {
          productId: id,
          quantity: 2,
        }
      ]
    }
    beforeEach(async () => {
      const db = await mongoConnection.connection();
      await db.collection('sales').insertOne(saleProducts);
    });

    afterEach(async () => {
      const db = await mongoConnection.connection();
      await db.collection('sales').drop();
    });

    it('Verifica se retorna o produto deletado', async () => {
      const response = await SaleModel.exclude(saleId);
      expect(response).to.deep.equals(saleProducts);
    });

    it('Verifica se o produto é deletado com suceso', async () => {
      await ProductModel.exclude(id);

      const db = await mongoConnection.connection();
      const response = await db.collection('products').findOne({_id: saleId});
      expect(response).to.be.null;
    });

    it('Quando é inserido um id incorreto', async () => {
      const response = await SaleModel.exclude('604cb554311d68f491ba5dfghh');
      expect(response).to.be.null;
    })
  });
});


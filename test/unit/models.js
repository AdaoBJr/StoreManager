const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const mongoConnection = require('../../src/config/mongoConnection');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

// product model
describe('testando model Products', () => {
  let DBServer = new MongoMemoryServer();;
	let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
    .then((conn) => conn.db('model_example'));

		sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

	after(async () => {
		await mongoConnection.getConnection.restore();
	});

  const invalidId = 7777;

  const exP = {
    name: "Armadura do Homem de Ferror",
    quantity: "40",
  }

  const updP= {
    name: "Armadura do Homem de Ferror",
    quantity: "100",
  }

  describe('cria um produto' , async () => {
		it('retorna um objeto' , async () => {
			const response = await productsModel.newProduct(exP.name, exP.quantity);
			expect(response).to.be.a('object');
		});

    it('possui "_id", "name", "quantity"', async () => {
      const product = await productsModel.newProduct(exP.name, exP.quantity);

      expect(product).to.include.all.keys('_id', 'name', 'quantity')
    });
	});

  describe('pega produto pelo nome' , async () => {
		it('retorna um objeto' , async () => {
			const response = await productsModel.getProductByName(exP.name, exP.quantity);
			expect(response).to.be.a('object');
		});

    it('possui "_id", "name", "quantity"', async () => {
      const product = await productsModel.newProduct(exP.name, exP.quantity);

      expect(product).to.include.all.keys('_id', 'name', 'quantity')
    });
	});

  describe('pega todos os produtos' , async () => {
    before(async () => {
      await productsModel.newProduct(exP.name, exP.quantity);
    });

		it('retorna um array' , async () => {
			const response = await productsModel.getAllProducts(exP.name, exP.quantity);

			expect(response).to.be.a('array');
		});

    it('o array nao esta vazio', async () => {
      const response = await productsModel.getAllProducts(exP.name, exP.quantity);

      expect(response).to.be.not.empty;
    });
	});

  describe('pega o produto com o _id' , async () => {
    let ID;

    before(async () => {
      ID = await (await productsModel.newProduct(exP.name, exP.quantity))._id;
    });

		it('retorna um objeto' , async () => {
			const response = await productsModel.getProductById(ID);
      
			expect(response).to.be.a('object');
		});

    it('retorna null se o _id for invalido', async () => {
      const response = await productsModel.getProductById(invalidId);

      expect(response).to.be.null;
    });
	});

  describe('atualiza o produto com o _id' , async () => {
    let ID;

    before(async () => {
      ID = await (await productsModel.newProduct(exP.name, exP.quantity))._id;
    });

    it('retorna null se o _id for invalido', async () => {
      const response = await productsModel.getProductById(invalidId);

      expect(response).to.be.null;
    });

		it('retorna um objeto' , async () => {
			const response = await productsModel.update(ID,updP.name, updP.quantity);
      
			expect(response).to.be.a('object');
		});

    it('retorna produto atualizado', async () => {
      const response = await productsModel.update(ID,updP.name, updP.quantity);
      const { name, quantity } = response;

      expect(name).to.be.equal('Armadura do Homem de Ferror');
      expect(quantity).to.equal('100');
    });
	});

  describe('deleta o produto com o _id' , async () => {
    let ID;

    before(async () => {
      ID = await (await productsModel.newProduct(exP.name, exP.quantity))._id;
    });

    it('retorna null se o _id for invalido', async () => {
      const response = await productsModel.getProductById(invalidId);

      expect(response).to.be.null;
    });

		it('retorna um objeto' , async () => {
			const response = await productsModel.exclude(ID);
      
			expect(response).to.be.a('object');
		});
	});
});


// sales model
describe('testando model sales', () => {
  let DBServer = new MongoMemoryServer();;
	let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
    .then((conn) => conn.db('model_example'));

		sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

	after(async () => {
		await mongoConnection.getConnection.restore();
	});

  const invalidId = 7777;

  const expSale = [{
    "productId": "615c64909d3291624bdb82d3",
    "quantity": "40"
  }]

  const updSale= {
    "productId": "615c64909d3291624bdb82d3",
    "quantity": "10"
  }

  const exP = {
    name: "Armadura do Homem de Ferror",
    quantity: "40",
  }

  describe('cria uma sale' , async () => {
		it('retorna um objeto' , async () => {
			const response = await salesModel.newSale(expSale);
      console.log(response);
			expect(response).to.be.a('object');
		});

    it('possui "_id" e um itensSold', async () => {
      const product = await salesModel.newSale(expSale);

      expect(product).to.include.all.keys('_id', 'itensSold')
    });
	});

  describe('retorna todos as sales' , async () => {
    before(async () => {
      await salesModel.newSale(expSale);
    });

		it('retorna um array' , async () => {
			const response = await salesModel.allSales();

			expect(response).to.be.a('array');
		});

    it('o array nao esta vazio', async () => {
      const response = await salesModel.allSales();

      expect(response).to.be.not.empty;
    });
	});

  describe('pega um sale com o _id' , async () => {
    let ID;

    before(async () => {
      ID = await (await salesModel.newSale(expSale))._id;
    });

		it('retorna um objeto' , async () => {
			const response = await salesModel.getSaleById(ID);
      
			expect(response).to.be.a('object');
		});

    it('retorna null se o _id for invalido', async () => {
      const response = await salesModel.getSaleById(invalidId);

      expect(response).to.be.null;
    });
	});

  describe('atualiza o produto com o _id' , async () => {
    let ID;

    before(async () => {
      ID = await (await salesModel.newSale(expSale))._id;
    });

    it('retorna null se o _id for invalido', async () => {
      const response = await salesModel.getSaleById(invalidId);

      expect(response).to.be.null;
    });

		it('retorna um objeto' , async () => {
			const response = await salesModel.update(ID, updSale);
      
			expect(response).to.be.a('object');
		});

    it('retorna produto atualizado', async () => {
      const response = await salesModel.update(ID, updSale);
      const { itensSold } = response;

      expect(itensSold).to.be.equal(updSale);
    });
	});

  describe('deleta o produto com o _id' , async () => {
    let ID;

    before(async () => {
      const product = await productsModel.newProduct(exP.name, exP.quantity);
      
      let delSale = [{
        productId: product._id,
        "quantity": "10"
      }];
      ID = await (await salesModel.newSale(delSale));
    });

    it('retorna null se o _id for invalido', async () => {
      const response = await salesModel.getSaleById(invalidId);

      expect(response).to.be.null;
    });

		it('sale deletado com sucesso' , async () => {
			const response = await salesModel.exclude(ID);
      console.log(response);
      
			expect(response).to.be.null;
		});
	});
});
const { expect } = require('chai');
const sinon = require('sinon');

const serviceModel = require('../../services/productsService')
const productsModel = require('../../models/productsModel')

const fakeValidId = '615495794851a62068f4da07'

describe('Testa a função validateProduct do productService', () => {
  before(() => {
    sinon.stub(productsModel, 'findByName')
      .resolves(true);
  });

  after(() => {
    productsModel.findByName.restore();
  });

  it('Envia um nome com lenght menor que 5', async () => {
    const response = await serviceModel.validateProduct('xab', '5')

    expect(response).to.be.an('string');
  })

  it('Envia um número menor que 1', async () => {
    const response = await serviceModel.validateProduct('xablauu', 0)

    expect(response).to.be.an('string');
  })

  it('Envia um produto que já existe', async () => {
    const response = await serviceModel.validateProduct('xablauu', 5)

    expect(response).to.equal('Product already exists');
  })
})

describe('Testa a função createNewProduct do productService', () => {
  const product = {
    name: "Produto",
    quantity: 10,
  }
  before(() => {
    sinon.stub(productsModel, 'create')
    .resolves({
      _id: 1,
      name: product.name,
      quantity: product.quantity,
    });
  });

  after(() => {
    productsModel.create.restore();
  });

  it('Retorna o produto criado com _id', async () => {
    const response = await serviceModel.createNewProduct(product.name, product.quantity)

    expect(response).to.have.a.property('_id')
  })

})

describe('Verifica se é possivel consultar os produtos cadastrados', () => {

  describe('Testes de erro de id e cadastro', () => {
    before(() => {
      sinon.stub(productsModel, 'findById')
      .resolves()
    })
  
    after(() => {
      productsModel.findById.restore();
    })

    it('Retorna um erro se o id for inválido', async () => {
      const response = await serviceModel.validateId("InvalidId")
      
      expect(response.err.code).to.equal('invalid_data');
    })
  
    it('Retorna um erro se o produto não estiver cadastrado', async () => {
      const response = await serviceModel.getProductById(fakeValidId)
      
      expect(response.err.code).to.equal('invalid_data');
    })
  })

  describe('Teste de um produto válido', () => {
    before(() => {
      sinon.stub(productsModel, 'findById')
      .resolves({
        _id: fakeValidId,
        name: "Product Name",
        quantity: 100
      })
    })
  
    after(() => {
      productsModel.findById.restore();
    })
    
    it('Retorna o produto se o id estiver correto e o produto estiver cadastrado', async () => {
      const foundProduct = await serviceModel.getProductById(fakeValidId);
      
      expect(foundProduct).to.have.property('_id')
    })
  })
  describe('Verifica se retorna todos os produtos', () => {
    before(() => {
      sinon.stub(productsModel, 'getAllProducts')
      .resolves({
        "products": [
          {
            _id: fakeValidId,
            name: "Product Name",
            quantity: 100
          },
          {
            _id: fakeValidId,
            name: "Second Product Name",
            quantity: 10
          }
        ]
      })
    })
  
    after(() => {
      productsModel.getAllProducts.restore();
    })
    
    it('Retorna o produto se o id estiver correto e o produto estiver cadastrado', async () => {
      const foundProductList = await serviceModel.getAllProducts(fakeValidId);

      expect(foundProductList.products).to.be.an('array').not.empty;
    })
  })
})

describe('Verifica se o produto é atualizado', () => {
  before(() => {
    sinon.stub(productsModel, 'updateOne')
    .resolves(
      {
        _id: fakeValidId,
        name: "New Product Name",
        quantity: 100
      }
    )
  })

  after(() => {
    productsModel.updateOne.restore();
  })
  
  it('Retorna o produto atualizado', async () => {
    const newProduct = await serviceModel.updateProduct(fakeValidId, "New Product Name", 100);

    expect(newProduct).to.be.an('object');
    expect(newProduct).to.have.a.property('_id');
    expect(newProduct.name).to.equal("New Product Name");
  })
})


describe('Verifica se o produto é deletado', () => {
  describe('Quando ele existe', () => {
    before(() => {
      sinon.stub(productsModel, 'deleteProduct')
      .resolves(1)
    })
  
    after(() => {
      productsModel.deleteProduct.restore();
    })
    
    it('Deleta o produto', async () => {
      const deleted = await serviceModel.deleteProduct(fakeValidId);
      
      expect(deleted).to.be.true;
    })
  })

  describe('Quando ele não existe', () => {
    before(() => {
      sinon.stub(productsModel, 'deleteProduct')
      .resolves(0)
    })
  
    after(() => {
      productsModel.deleteProduct.restore();
    })
    
    it('Retorna uma mensagem de erro', async () => {
      const deleted = await serviceModel.deleteProduct(fakeValidId);
  
      expect(deleted).to.have.property('errorMessage')
    })
  })
})

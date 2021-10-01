const { expect } = require('chai');
const sinon = require('sinon');

const serviceModel = require('../../services/productsService')
const productsModel = require('../../models/productsModel')
const salesService = require('../../services/salesService')
const salesModel = require('../../models/salesModel')

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

describe('Teste das funções validateId, validateQuantity, isProductOnDb, insertSalesProducts e validateProductsArray do salesService', () => {
  describe('Função insertSalesProducts', () => {
    const dbResponse = {
      _id: "615634ffbb5b8c47a42ee951",
      itensSold: [
        {
          productId: "615634e53519a410a0fbbfd5",
          quantity: 10,
        }
      ]
    }
    before(() => {
      sinon.stub(salesModel, 'insertSales').returns(dbResponse);
    });
  
    after(() => {
      salesModel.insertSales.restore();
    });

    it('Retorna o objeto inserido no db', async () => {
      const response = await salesService.insertSales([{productId: '615634e53519a410a0fbbfd5',quantity: 10}])
  
      expect(response).to.be.equal(dbResponse);
    })
  })

  describe('Função validateId', () => {
    it('Envia um ID válido', async () => {
      const response = await salesService.validateId('InvalidID')
  
      expect(response).to.be.true;
    })

    it('Envia um ID inválido', async () => {
      const response = await salesService.validateId(fakeValidId)
  
      expect(response).to.be.false;
    })
  })

  describe('Função validateQuantity', () => {
    it('Envia uma quantidade menor que 1', async () => {
      const response = await salesService.validateQuantity(0)
  
      expect(response).to.be.true;
    })

    it('Envia uma quantidade maior que 0', async () => {
      const response = await salesService.validateQuantity(1)
  
      expect(response).to.be.false;
    })
  })

  describe('Função isProductOnDb', () => {
    describe('O produto está no banco', () => {
      before(() => {
        sinon.stub(productsModel, 'findById')
          .resolves(true);
      });
    
      after(() => {
        productsModel.findById.restore();
      });
      
      it('A resposta é true', async () => {
        const response = await salesService.isProductOnDb(fakeValidId)
    
        expect(response).to.be.true;
      })
    })

    describe('O produto não está no banco', () => {
      before(() => {
        sinon.stub(productsModel, 'findById')
          .resolves();
      });
    
      after(() => {
        productsModel.findById.restore();
      });

      it('A resposta é false', async () => {
        const response = await salesService.isProductOnDb(fakeValidId)
    
        expect(response).to.be.false;
      })
    })
  })

  describe('Função validateProductsArray', () => {  
    describe('Todos os dados enviados estão corretos', () => {
      const salesArray = [
        { productId: fakeValidId, quantity: 10},
        { productId: fakeValidId, quantity: 100}
      ]
      before(() => {
        sinon.stub(productsModel, 'findById').returns(true);
      });
    
      after(() => {
        productsModel.findById.restore();
      });
  
      it('A resposta é undefined', async () => {
        const response = await salesService.validateProductsArray(salesArray)
    
        expect(response).to.be.undefined;
      })
    })

    describe('O produto não está cadastrado', () => {
      const salesArray = [
        { productId: fakeValidId, quantity: 10},
        { productId: fakeValidId, quantity: 100}
      ]
      before(() => {
        sinon.stub(productsModel, 'findById').returns(false);
      });
    
      after(() => {
        productsModel.findById.restore();
      });
  
      it('A resposta é um erro', async () => {
        const response = await salesService.validateProductsArray(salesArray)
    
        expect(response.errorMessage).to.exist;
      })
    })

    describe('Quando algum outro dado é inválido', () => {
      let salesArray = [
        { productId: 'fakeValidId', quantity: 10},
        { productId: fakeValidId, quantity: 100}
      ]

      before(() => {
        sinon.stub(productsModel, 'findById').returns(true);
      });
    
      after(() => {
        productsModel.findById.restore();
      });
  
      it('Quando ao menos um id é inválido a resposta é uma mensagem de erro', async () => {
        const response = await salesService.validateProductsArray(salesArray)
    
        expect(response.errorMessage).to.exist;
      })

      it('Quando ao menos um número é menor que 1 a resposta é uma mensagem de erro', async () => {
        salesArray = [
          { productId: fakeValidId, quantity: 0},
          { productId: fakeValidId, quantity: 100}
        ]
        const response = await salesService.validateProductsArray(salesArray)
    
        expect(response.errorMessage).to.exist;
      })
    })
  })
})


describe('Testa a funcao updateProductQuantity do salesService', () => {
    const validSaleArray = [
      {
        "productId": "6156723b0aa0488f7c75afcc",
        "quantity": "1"
      }
    ]
  describe('Quando a quantidade é válida', () =>{
    const validProduct = {
      _id: "6156723b0aa0488f7c75afcc",
      name: "aaa Vai logo por favor",
      quantity: 1
    }
    before(() => {
      sinon.stub(productsModel, 'findById')
      .resolves(validProduct)
      sinon.stub(productsModel, 'updateOne')
      .resolves()
    })
  
    after(() => {
      productsModel.findById.restore();
      productsModel.updateOne.restore();
    })
    
    it('Atualiza a quantidade removendo do estoque', async () => {
      const updated = await salesService.updateProductQuantity(validSaleArray, true);
      
      expect(updated).to.be.undefined;
    })

    it('Atualiza a quantidade adicionando ao estoque', async () => {
      const updated = await salesService.updateProductQuantity(validSaleArray);
      
      expect(updated).to.be.undefined;
    })
  })

  describe('Quando a quantidade informada é maior que o estoque', () =>{
    const validProduct = {
      _id: "6156723b0aa0488f7c75afcc",
      name: "aaa Vai logo por favor",
      quantity: 0
    }
    before(() => {
      sinon.stub(productsModel, 'findById')
      .resolves(validProduct)
      sinon.stub(productsModel, 'updateOne')
      .resolves()
    })
  
    after(() => {
      productsModel.findById.restore();
      productsModel.updateOne.restore();
    })

    it('Retorna uma mensagem de erro', async () => {
      const updated = await salesService.updateProductQuantity(validSaleArray, true);
      
      expect(updated.errorMessage).to.exist;
    })
  })
})

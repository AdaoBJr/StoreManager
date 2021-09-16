// const HTTP_OK_STATUS = 201;
// const HTTP_OK_DUZENTOS = 200;
// const salesModel = require('../models/sales');

const HTTP_ERR_FALSE = 422;
const HTTP_ERR_404 = 404;

const erroMensage = (message) => ({
    err: {
      code: 'invalid_data',
      message,
    },
  });

  const erroMensageSales = (message) => ({
    err: {
      code: 'not_found',
      message,
    },
  });

const salesWithAllProductValid = (req, res, next) => {
    const allProductSales = req.body;
    const erroProductName = 'Wrong product ID or invalid quantity';
    const ERRO = erroMensage(erroProductName);
    // Existe alguma venda que não foi preenchida corretamente?
    const productsErro = allProductSales.filter((sale) =>
     typeof sale.quantity !== 'number' || sale.quantity < 1);
   
     // Caso exista, apenas retorne o erro!
     if (productsErro.length > 0) {
        return res.status(HTTP_ERR_FALSE).json(ERRO);
    }
    
      next();
    };

    const ifSaleIdNotExists = async (req, res, next) => {
      const { id } = req.params;
      const methodRequest = req.method;
      const message = 'Sale not found';
      console.log(methodRequest, id, ' Method');
      const ERRO = erroMensageSales(message);

      // const ERRO = erroMensageSales(message);
      if (id.length !== 24 && methodRequest === 'DELETE') {
        return res.status(HTTP_ERR_FALSE).json({
          err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format' } });
      }
      
      if (id.length !== 24 && methodRequest === ('GET')) {
        console.log(id, 'ifGET');
        return res.status(HTTP_ERR_404).json(ERRO);
      }

      next();
    };

    // const      ifSaleIdNotExists = async (req, res, next) => {
    //   const { id } = req.params;
    //   const methodRequest = req.method;
    //   const message = 'Sale not found';
    //   console.log(methodRequest, ' Method');

    //   const ERRO = erroMensageSales(message);
    //   if ((id.length !== 24) && methodRequest === 'GET') {
    //     return res.status(HTTP_ERR_404).json(ERRO);
    //   }
    //   // if (methodRequest === 'DELETE') {
    //   //   return res.status(HTTP_ERR_FALSE).json({
    //   //     err: {
    //   //     code: 'invalid_data',
    //   //     message: 'Wrong sale ID format' } });
    //   // }

    //   next();
    // };
    
// // 422 Se manda invalido no 8 gera 422
//     expect(error).toBe('invalid_data');
//     expect(message).toBe('Wrong sale ID format');

// // 404 do 6 é ID existente invalido
// expect(responseError.err.code).toEqual('not_found');
// expect(responseError.err.message).toEqual('Sale not found');

// // Se mandar null ou undefined 8 gera 404
// expect(error).toBe('not_found');
// expect(message).toBe('Sale not found');

module.exports = { salesWithAllProductValid, ifSaleIdNotExists, erroMensageSales };
const express = require('express');

const productsRouter = require('./src/routers/productsRouter');

const { errorMiddleware } = require('./errorMiddleware');

const app = express();

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint abaixo, ele está ai para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));

// Caso o recurso não seja encontrado, sua API retorne o status HTTP adequado com o body { message: '<recurso> não encontrado' }.

// Em caso de erro, sua API retorne o status HTTP adequado com o body { err: { message: <mensagem de erro>, code: <código do erro> } }.

// O código do erro deve ser determinado por você e deve seguir o mesmo padrão para toda a aplicação. Por exemplo: 'not_found', 'invalid_data' e afins.

// Em caso de dados inválidos, sua API retorne o status HTTP adequado, com o body { err: { message: 'Dados inválidos', code: <código do erro> } }.

// Todos os retornos de erro devem seguir o mesmo formato. Para erros que requerem dados adicionais (por exemplo, para informar quais campos estão incorretos) utilize a propriedade data dentro do objeto err.

// gerar os objetos de erro personalizados, biblioteca de erros, boom.

// Joi

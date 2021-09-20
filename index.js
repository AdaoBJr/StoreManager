const express = require('express');
const { productsRoute, salesRoute } = require('./routes');

const app = express();
app.use(express.json());

const PORT = '3000';

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.listen(PORT, () => {
  console.log(`Online in port ${PORT}!!`);
});

// Agradecimentos especiais ao meu colega de turma Leandro Reis, pois a principio eu estava tendo muitas dificuldades com o projeto e com essa matéria inteira no geral, e o Leandro foi me ajudando a entender o passo a passo da criação de uma API restful, me mostrando o projeto dele e me ajudando a entender o funcionamento da mesma. Muito obrigado, Leandro. Sem a sua ajuda eu jamais teria conseguido!
// Link do PR: https://github.com/tryber/sd-010-b-store-manager/pull/72

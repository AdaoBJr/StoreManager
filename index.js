require('dotenv').config();
const app = require('./src/app');

const defaultPort = 3000;
const PORT = process.env.PORT || defaultPort;

app.listen(PORT, () => {
  console.log(`Servidor online na porta ${PORT}`);
});

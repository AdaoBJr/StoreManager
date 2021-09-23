const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();

const routesProducts = require('./routes/ProductRoutes');
const salesController = require('./controllers/SalesControllers');

const app = express();
app.use(bodyParser);

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(routesProducts);

app.get('/sales', rescue(salesController.fetchSales));
app.get('/sales/:id', rescue(salesController.findById));

app.post('/sales', rescue(salesController.newSale));

app.put('/sales/:id', rescue(salesController.updateSale));

app.delete('/sales/:id', rescue(salesController.deleteSale));

app.use((err, _req, res, _next) => {
  if (err.err) {
    const { status, err: { code, message } } = err;
    return res.status(status).json({ err: { code, message } });
  } return res.status(500).json(err);
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));

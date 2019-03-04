const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const consign = require('consign');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8082');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

consign()
  .include('./db.js')
  .then('models')
  .into(app);


app.get('/api', (req, res) => {
  res.json({ description: 'It\'s a API for a test! JWT Token is not needed in this case.' });
});

app.get('/api/customers', (req, res) => {
  app.models.customers.list(app, res);
});

app.get('/api/customers/discounts/:customerId', (req, res) => {
  const { customerId } = req.params;
  app.models.customers.discounts(app, res, customerId);
});

app.get('/api/products', (req, res) => {
  app.models.products.list(app, res);
});

app.get('/api/products/discounts/:productId', (req, res) => {
  const { productId } = req.params;
  app.models.products.discounts(app, res, productId);
});

const port = 8080;
const sPort = 8081;
const time = new Date().toLocaleTimeString();
app.listen(port, () => {
  console.log(`App listening on port ${port} ${time}`);
});

https.createServer({
  key: fs.readFileSync('./ssl/localhost.key'),
  cert: fs.readFileSync('./ssl/localhost.crt'),
}, app).listen(sPort, () => {
  console.log(`App listening on secure port ${sPort} ${time}`);
});

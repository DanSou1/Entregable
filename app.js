const express = require('express');
const fs = require('fs');
const app = express();

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  fs.readFile('./productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo de productos');
      return;
    }
    let products = JSON.parse(data); 
    if (limit) {
      const limitedProducts = products.slice(0, limit); 
      res.json(limitedProducts);
    } else {
      res.json(products); 
    }
  });
});
app.get('/products/:pid', (req, res) => {
    const productId = req.params.pid;
    fs.readFile('productos.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al leer el archivo de productos');
        return;
      }
      let products = JSON.parse(data);
      const product = products.find(p => p.id === productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).send('Producto no encontrado');
      }
    });
  });

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
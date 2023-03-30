
// const db = require('../db/getAllRows.js');
const products = require('../db/products.js')

module.exports = (app) => {

  //* includes ?category={category}
  app.get('/products', products.getProducts, (req, res, next) => {
    res.status(200).json(req.results);
  } );

  app.param("id", products.getProductId);

  app.get('/products/:id', (req, res, next) => {
    if (req.results) {
      res.status(200).json(req.results);
    } else {
      res.status(404).json("Could not locate product id", id);
    }
  })

}
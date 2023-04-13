
const carts = require('../db/x-carts.js'); 
const { basicAuthentication, matchIdAuthentication} = require('./x-authMiddlewares.js')

module.exports = (app) => {

  
  app.get('/carts', carts.getCarts, (req, res, next) => {
    res.status(200).json(req.results);
  } );
  
  app.param("cartId", carts.getCartId);
  
  //* basic authentication only, not matching user id to own profile
  app.get('/cart/:cartId', basicAuthentication, (req, res, next) => {
    res.status(200).json(req.results);
  } );
  
  //* only 1 cart per customer
  app.post('/cart/:cartId', [basicAuthentication, carts.postProductToCart] , (req, res, next) => {
    res.status(200).send('in cart/:product ida nd user id is: ' );
  })

  app.get("/cart/:cartId/checkout", [basicAuthentication, carts.getProductsInCart] , (req, res, next) => {
    console.log( ' in checkout and req.products is ', req.products)
    res.status(200).send(req.products);
  });

  app.post("/cart/:cartId/checkout", [basicAuthentication, carts.payment] , (req, res, next) => {
    console.log( ' in checkout')
    res.status(200).send("Your order has been successfully created and your payment has been received");
  });


};
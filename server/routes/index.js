
// const testRouter = require('./noLongerNeeded/x-test');
// const customersRouter = require('./x-customers');
// const productsRouter = require('./x-products');
// const cartsRouter = require('./x-carts');
// const db = require('../db/x-getAllRows.js');

const customerRoutes = require('./customerRoutes.js');
const productsRouter = require('./productsRoutes.js');
const cartRouter = require('./cartRoutes.js');

module.exports = (app) => {

     // //*--- ALL ROWS FROM TABLES --------------------------------
  //    app.get('/orders', db.getOrders);
  //    app.get('/payments', db.getPayments);
  //    app.get('/carts', db.getCarts);
  //    app.get('/cart-items', db.getCartItems);


  // testRouter(app);
  customerRoutes(app);
  productsRouter(app);
  cartRouter(app);
  // cartsRouter(app);


 

};
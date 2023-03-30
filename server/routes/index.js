
const testRouter = require('./test');
const customersRouter = require('./customers');
const productsRouter = require('./products');
const cartsRouter = require('./carts');

module.exports = (app, passport) => {

  testRouter(app);
  customersRouter(app, passport);
  productsRouter(app);
  cartsRouter(app);

};
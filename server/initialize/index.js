const expressInitializer = require("./express");
const passportInitializer = require("./passport");
const routesLoader = require("../routes");
const db = require('../db/getAllRows.js');

module.exports = async (app) => {
  
  //?------------   LOAD EXPRESS MIDDLE WARE --------------------------------
  const expressInitialized = await expressInitializer(app);
  //? -----------  LOAD PASSPORT --------------------------------
  const passportInitialized = passportInitializer(expressInitialized);
  //? -----------  LOAD ROUTES --------------------------------
  routesLoader(expressInitialized, passportInitialized);

  //!load swagger


    // //*--- ALL ROWS FROM TABLES --------------------------------
    app.get('/orders', db.getOrders);
    app.get('/payments', db.getPayments);
    app.get('/carts', db.getCarts);
    app.get('/cart-items', db.getCartItems);

  //*--- ERROR HANDLING  --------------------------------
  app.use((err, req, res, next) => {
    const status = err.status || 404;
    const message = err.message || "There was a problem with the request";
    res.status(status).send(message);
  });
  
};

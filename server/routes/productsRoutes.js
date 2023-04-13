// const db = require('../db/getAllRows.js');
// const products ('../db/products.js')
const {
  getAllProductsFromDb,
  getProductId,
  getProductsByCategoryFromDb,
} = require("../db/productQueries.js");

module.exports = (app) => {
  app.get("/products", (req, res, next) => {
    getAllProductsFromDb((error, result) => {
      if (error) return res.send({ error: error });
      return res.send(result);
    });
  });

  ///!   use other middleware
  app.param("productId", getProductId);

  app.get("/products/:productId", (req, res, next) => {
    if (req.results) {
      res.status(200).json(req.results);
    } else {
      res.status(404).json("Could not locate product id", id);
    }
  });

  //???????????        boots

  app.get("/boots", function (req, res) {
    getProductsByCategoryFromDb("boots", (error, result) => {
      if (error) return res.send({ error: error });
      return res.send(result);
    });
  });

  //????????????      skis

  app.get("/skis", function (req, res) {
    getProductsByCategoryFromDb("skis", (error, result) => {
      if (error) return res.send({ error: error });
      return res.send(result);
    });
  });

  //????????????      poles
  app.get("/poles", function (req, res) {
    getProductsByCategoryFromDb("poles", (error, result) => {
      if (error) return res.send({ error: error });
      return res.send(result);
    });
  });
};

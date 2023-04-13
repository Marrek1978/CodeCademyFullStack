// const db = require('../db/getAllRows.js');
// const products ('../db/products.js')
const addProductToCartInDB = require("../db/cartQueries.js");

module.exports = (app) => {
  app.post("/cart/add", (req, res) => {
    //get userID and productID from req.body
    const { userID, productID, price } = req.body;
    addProductToCartInDB({ userID, productID, price }, (error, result) => {
      if (error) return res.send({ error: error});
      return res.send(result);
    });
  });

  // app.get("/products", (req, res, next) => {
  //   getAllProductsFromDb((error, result) => {
  //     if (error) return res.send({ error: error });
  //     return res.send(result);
  //   });
  // });

  // ///!   use other middleware
  // app.param("productId", getProductId);

  // app.get("/products/:productId", (req, res, next) => {
  //   if (req.results) {
  //     res.status(200).json(req.results);
  //   } else {
  //     res.status(404).json("Could not locate product id", id);
  //   }
  // });
};

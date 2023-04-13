const { query } = require("./x-index.js");

const getProductId = (req, res, next, id) => {
  
  var onlyNum = /^[0-9]+$/.test(id);

  if (onlyNum) {
    let productId = Number(id);
    try {
      query(
        `SELECT * FROM products WHERE id = $1`,
        [productId],
        (err, results) => {
          if (err) {
            err.status = 400;
            next(err);
          }

          if (results === undefined || results.rows?.length === 0) {
            let error = new Error("Cannot find product");
            next(error);
          } else {
            req.results = results.rows[0];
            next();
          }
        }
      );
    } catch (err) {
      next(err);
    }
  } else {
    let error = new Error("ID must be a number");
    error.status = 400;
    next(error);
  }
};

const getProducts = (req, res, next) => {
  const productCategory = req.query.category;
  if (productCategory) {
    console.log("productCategory is ", productCategory);

    try{


      query("SELECT * FROM products WHERE category = $1", [productCategory], (error, results) => {
        if (error) {
          let error = new Error(`There was a problem retrieving ${productCategory} Products.  Appropriate categories include "category=boot" and "category=ski"`);
          next(error);
        }

        if (results === undefined || results.rows.length === 0) {
          let error = new Error(`There was a problem retrieving ${productCategory} Products.  Appropriate categories include "category=boot" and "category=ski"`);
          next(error);
        } else {
          console.log("results.rows");
          req.results = results.rows;
          next();
        }
      });


    }catch(err){
      next(err);
    }
  } else {
    try {
      query("SELECT * FROM products", (error, results) => {
        if (error) {
          let error = new Error("There was a problem retrieving all Products");
          next(error);
        }

        if (results === undefined || results.rows.length === 0) {
          let error = new Error(
            "There was an error retrieving products.  Contact support"
          );
          next(error);
        } else {
          console.log("results.rows");
          req.results = results.rows;
          next();
        }
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = {
  getProductId,
  getProducts,
};

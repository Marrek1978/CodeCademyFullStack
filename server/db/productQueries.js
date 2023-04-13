const { query } = require("./connection");

const getAllProductsFromDb = async (done) => {
  //sql call
  try {
    query(`SELECT * FROM products LIMIT 10`, (err, results) => {
      if (err) return done(err);
      if (results === undefined || results.rows.length === 0)
        return done(null, false, { message: "No Products Found" });
      return done(null, results.rows);
    });
  } catch (err) {
    return done(err);
  }
};

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

const getProductsByCategoryFromDb = async (category, done) => {

  try {
    query(`SELECT * FROM products WHERE category = $1`, [category], (err, results) => {
      if (err) return done(err);
      if (results === undefined || results.rows.length === 0)
        return done(null, false, { message: "No Products Found" });
      return done(null, results.rows);
    });
  } catch (err) {
    return done(err);
  }

}

module.exports = {
  getAllProductsFromDb,
  getProductId,
  getProductsByCategoryFromDb
};

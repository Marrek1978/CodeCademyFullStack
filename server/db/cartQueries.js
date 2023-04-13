const { query } = require("./connection");
const accounting = require("../accounting");

const addProductToCartInDB = async ({ userID, productID, price }, done) => {
  //sql call
  //!!! need to handle errors returned from the db!!

  let userCartId = await getUserCartId(userID);
  if (!userCartId) {
    userCartId = await createUserCart(userID);
  }

  let cartIDProductIdQuantity = await getCartItemQuantity(
    userCartId,
    productID
  );
  if (!cartIDProductIdQuantity) {
    const quantity = 1;
    const product_price = accounting.formatMoney(price);
    const productPrice = accounting.unformat(price);
    const total = accounting.formatMoney(quantity * productPrice);

    cartIDProductIdQuantity = await createCartItem(
      userCartId,
      productID,
      quantity,
      product_price,
      total
    );
  } else {
    //add 1 to quanity
    const { quantity, product_price} = cartIDProductIdQuantity;
    const newQuantity = quantity + 1;
    const productPrice = accounting.unformat(product_price);
    const newTotal = accounting.formatMoney(newQuantity * productPrice);

    cartIDProductIdQuantity = await updateCartItem(
      userCartId,
      productID,
      newQuantity,
      product_price,
      newTotal
    );
  }

  done(null, "success");
};

const updateCartItem = async (
  userCartId,
  productID,
  quantity,
  product_price,
  total
) => {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        `UPDATE cart_item SET quantity = $1, total = $2 WHERE cart_id = $3 AND product_id = $4 RETURNING *`,
        [quantity, total, userCartId, productID],
        (err, results) => {
          if (err) {
            reject(err);
          }

          if (results === undefined || results.rows.length === 0) {
            let error = new Error("There was a problem with this operation");
            reject(error);
          }

          resolve(results.rows[0]);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const createCartItem = async (
  userCartId,
  productID,
  quantity,
  product_price,
  total
) => {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        `INSERT INTO cart_item (cart_id, product_id, quantity, product_price, total) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [userCartId, productID, quantity, product_price, total],
        (err, results) => {
          if (err) {
            reject(err);
          }

          if (results === undefined || results.rows.length === 0) {
            let error = new Error("There was a problem with this operation");
            reject(error);
          }

          resolve(results.rows[0]);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const getUserCartId = async (userID) => {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        `SELECT id FROM cart WHERE customer_id = $1 `,
        [userID],
        (err, results) => {
          if (err) return reject(err);
          if (results === undefined || results.rows.length === 0) {
            return resolve(false);
          }
          if (results?.rows.length > 1) {
            return resolve(results?.rows[0]?.id);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const createUserCart = async (userID) => {
  const newCartId = await getNewCartId();
  const todaysDate = new Date();

  const promise = new Promise((resolve, reject) => {
    try {
      query(
        `INSERT INTO cart (id, customer_id, created_on) VALUES ($1, $2, $3) RETURNING *`,
        [newCartId, userID, todaysDate],
        (err, results) => {
          if (err) {
            reject(err);
          }

          if (results === undefined || results.rows.length === 0) {
            let error = new Error("There was a problem with this operation");
            reject(error);
          }

          resolve(results.rows[0].id);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const getNewCartId = async () => {
  const promise = new Promise((resolve, reject) => {
    try {
      query("SELECT MAX(id) FROM cart", (error, results) => {
        if (error) {
          reject(error);
        }

        if (results === undefined || results.rows.length === 0) {
          let error = new Error("There was a problem with this operation");
          reject(error);
        } else {
          resolve(results.rows[0].max + 1);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

  return promise;
};

const getCartItemQuantity = async (cartID, productID, done) => {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "SELECT * FROM cart_item WHERE cart_id = $1 AND product_id = $2",
        [cartID, productID],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(false);
          } else {
            resolve(results.rows[0]);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });

  return promise;
};

// const getProductId = (req, res, next, id) => {
//   var onlyNum = /^[0-9]+$/.test(id);

//   if (onlyNum) {
//     let productId = Number(id);
//     try {
//       query(
//         `SELECT * FROM products WHERE id = $1`,
//         [productId],
//         (err, results) => {
//           if (err) {
//             err.status = 400;
//             next(err);
//           }

//           if (results === undefined || results.rows?.length === 0) {
//             let error = new Error("Cannot find product");
//             next(error);
//           } else {
//             req.results = results.rows[0];
//             next();
//           }
//         }
//       );
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     let error = new Error("ID must be a number");
//     error.status = 400;
//     next(error);
//   }
// };

// const getProductsByCategoryFromDb = async (category, done) => {

//   try {
//     query(`SELECT * FROM products WHERE category = $1`, [category], (err, results) => {
//       if (err) return done(err);
//       if (results === undefined || results.rows.length === 0)
//         return done(null, false, { message: "No Products Found" });
//       return done(null, results.rows);
//     });
//   } catch (err) {
//     return done(err);
//   }

// }

module.exports = addProductToCartInDB;

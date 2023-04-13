const { query } = require("../x-index.js");

async function getCartById(cartId) {
  const promise = new Promise((resolve, reject) => {
    try {
      query(`SELECT * FROM cart WHERE id = $1`, [cartId], (err, results) => {
        if (err) {
          reject(err);
        }

        if (results === undefined || results.rows?.length === 0) {
          resolve(null);
        } else {
          resolve(results.rows[0]);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

  return promise;
}

async function getAllCarts() {
  const promise = new Promise((resolve, reject) => {
    try {
      query("SELECT * FROM cart", (error, results) => {
        if (error) {
          reject(error);
        }

        if (results === undefined || results.rows.length === 0) {
          resolve(null);
        } else {
          resolve(results.rows);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
  return promise;
}

async function getNextCartId() {
  const promise = new Promise((resolve, reject) => {
    try {
      query("SELECT MAX(id) FROM cart ", (error, results) => {
        if (error) {
          reject(error);
        }

        if (results === undefined || results.rows.length === 0) {
          resolve(null);
        } else {
          resolve(results.rows[0].max + 1);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

  return promise;
}

async function getNextPaymentId(){
   const promise = new Promise((resolve, reject) => {
    try {
      query("SELECT MAX(id) FROM payments ", (error, results) => {
        if (error) {
          reject(error);
        }

        if (results === undefined || results.rows.length === 0) {
          resolve(null);
        } else {
          resolve(results.rows[0].max + 1);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

  return promise;
}

async function getNextOrderId(){
  const promise = new Promise((resolve, reject) => {
   try {
     query("SELECT MAX(id) FROM orders ", (error, results) => {
       if (error) {
         reject(error);
       }

       if (results === undefined || results.rows.length === 0) {
         resolve(null);
       } else {
         resolve(results.rows[0].max + 1);
       }
     });
   } catch (err) {
     reject(err);
   }
 });

 return promise;
}

async function createCustomerCart(userId, nextCartId) {
  let today = new Date().toJSON().slice(0, 10);

  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "INSERT INTO cart (id, customer_id, created_on) VALUES($1, $2, $3);",
        [nextCartId, userId, today],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(null);
          } else {
            resolve(results.rows[0].max + 1);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });

  return promise;
}

async function customerCartExists(customerId) {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "SELECT * FROM cart WHERE customer_id = $1 ",
        [customerId],
        (error, results) => {
          if (error) {
            // next(error);
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(null);
          } else {
            resolve(results.rows[0].id);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });

  return promise;
}

async function productAlreadyInCart(customerCartId, productId) {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "SELECT * FROM cart_item WHERE cart_id = $1 AND product_id = $2",
        [customerCartId, productId],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(null);
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
}

async function addProductToCart(
  customerCartId,
  productId,
  quantity,
  product_price,
  total
) {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "INSERT INTO cart_item (cart_id, product_Id, quantity, product_price, total) VALUES($1, $2, $3, $4, $5) RETURNING *;",
        [customerCartId, productId, quantity, product_price, total],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(null);
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
}

async function getProductDetails(productId) {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "SELECT * FROM products WHERE id = $1 ",
        [productId],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            reject(error);
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
}

async function updateCartQuantity(
  customerCartId,
  productId,
  quantity,
  price,
  total
) {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "UPDATE cart_item SET quantity=$1, product_price=$2, total=$3 WHERE cart_id = $4 AND product_Id = $5 RETURNING *;",
        [quantity, price, total, customerCartId, productId],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            // resolve(null);
            reject(error);
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
}

async function productsByCartId(cartId) {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "SELECT * FROM cart_item WHERE cart_id = $1;",
        [cartId],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(null);
          } else {
            resolve(results.rows);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
  return promise;
}

async function getCartTotal(cartId) {
  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "SELECT SUM(total) FROM cart_item WHERE cart_id = $1;",
        [cartId],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(null);
          } else {
            resolve(results.rows[0].sum);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
  return promise;
}


async function postToPayments(getNextPaymentId, cartId, getCartTotalCurr, paymentMethod){

  let today = new Date().toJSON().slice(0, 10);

  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "INSERT INTO payments (id, cart_id, payment_date, paid, payment_method) VALUES($1, $2, $3, $4, $5) RETURNING *;",
        [getNextPaymentId, cartId, today, getCartTotalCurr, paymentMethod],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(null);
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

}

async function postToOrders(getNextOrderId,paymentId, total, status){

  let today = new Date().toJSON().slice(0, 10);

  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "INSERT INTO orders (id, payment_id, order_date, order_total, status) VALUES($1, $2, $3, $4, $5) RETURNING *;",
        [getNextOrderId,paymentId,today, total, status],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(null);
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

module.exports = {
  getNextCartId,
  customerCartExists,
  createCustomerCart,
  productAlreadyInCart,
  addProductToCart,
  getProductDetails,
  updateCartQuantity,
  getCartById,
  getAllCarts,
  productsByCartId,
  getCartTotal,
  postToPayments,
  getNextPaymentId,
  getNextOrderId,
  postToOrders
};

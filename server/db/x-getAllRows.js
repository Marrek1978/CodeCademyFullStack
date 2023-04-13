
const {query} = require('./x-index.js');

// const getProducts = (request, response) => {
//   query('SELECT * FROM products', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// };

const getOrders = (request, response) => {
  query('SELECT * FROM orders', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getPayments = (request, response) => {
  query('SELECT * FROM payments', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getCarts = (request, response) => {
  query('SELECT * FROM cart', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getCartItems = (request, response) => {
  query('SELECT * FROM cart_item', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

module.exports = {
  // getCustomers,
  // getProducts,
  getOrders,
  getPayments,
  getCarts,
  getCartItems
}

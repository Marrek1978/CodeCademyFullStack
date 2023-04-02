const { query } = require("./index.js");
const customerServices = require("./dbServices/customerServices.js");
// const AuthService = require("./dbServices/AuthService.js");
// const AuthServiceInstance = new AuthService();
const bcrypt = require("bcrypt");

const getCustomers = async (req, res, next) => {
  await query("SELECT * FROM customer ORDER BY id", (error, results) => {
    if (error) {
      next(error);
    }

    req.results = results.rows;
    next();
  });
};

const registerCustomer = async (req, res, next) => {
  console.log("RegisterCustomer and req.body is " + req.body);
  //?   ---   HAS PARAMS? ---------
  const { username, password, email } = req.body;
  console.log("username: " + username + " password: " + password);
  if (username === undefined || password === undefined || email === undefined) {
    let error = new Error({
      error:
        "To enter a new customer, username, password, and email are required",
    });
    error.status = 400;
    return next(error);
  }

  //?   ---   UNIQUE? ---------
  const usernameExists = await customerServices.checkUsernameExists(username);
  if (usernameExists) {
    let error = new Error({ error: "Username already exists in the database" });
    error.status = 409;
    return next(error);
  }

  const emailExists = await customerServices.checkEmailExists(email);
  // const emailExists = await checkEmailExists(email);
  if (emailExists) {
    let error = new Error({ error: "Email already exists in the database" });
    error.status = 409;
    return next(error);
  }

  //************* */ procede to insert new customer into database.
  //?   ---   GET NEW (MAX + 1) ID ---------
  const newCustomerId = await customerServices.newCustomerId();
  if (!newCustomerId) {
    let error = new Error({
      error: "Something went wrong, please try again or contact support",
    });
    error.status = 400;
    return next(error);
  }

  const first_name = req.body.first_name ? req.body.first_name : null;
  const last_name = req.body.last_name ? req.body.last_name : null;
  const address = req.body.address ? req.body.address : null;
  const phone = req.body.phone ? req.body.phone : null;

  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    query(
      "INSERT INTO customer (id, username, password, email, first_name, last_name, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        newCustomerId,
        username,
        hashedPassword,
        email,
        first_name,
        last_name,
        address,
        phone,
      ],
      (error, results) => {
        if (error) {
          error.status = 400;
          next(error);
        }

        if (results === undefined || results.rows.length === 0) {
          let error = new Error("There was a problem creating this customer");
          error.status = 400;
          next(error);
        } else {
          req.results = results.rows[0];
          next();
        }
      }
    );
    // }
  } catch (err) {
    next(err);
  }
};

const getCustomerId = (req, res, next, id) => {
  var onlyNum = /^[0-9]+$/.test(id);

  if (onlyNum) {
    let customerId = Number(id);
    try {
      query(
        `SELECT * FROM customer WHERE id = $1`,
        [customerId],
        (err, results) => {
          if (err) {
            err.status = 400;
            next(err);
          }

          if (results === undefined || results.rows.length === 0) {
            let error = new Error({ error: "Cannot find customer" });
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
    let error = new Error({ error: "ID must be a number" });
    error.status = 400;
    next(error);
  }
};

const updateCustomerById = (req, res, next) => {
  let customerId = Number(req.results.id);

  //* ----   sanitize the vars ----
  const id = customerId;
  const sanitizedCustomerObj = customerServices.customerObj(
    req.body,
    req.results
  );
  const { username, pass, email, first_name, last_name, address, phone } =
    sanitizedCustomerObj;

  try {
    query(
      `UPDATE customer SET username = $1, pass = $2, email = $3, first_name = $4, last_name = $5, address = $6, phone = $7 WHERE id = $8`,
      [username, pass, email, first_name, last_name, address, phone, id],
      (error, results) => {
        if (error) {
          error.status = 400;
          next(error);
        }

        if (results != undefined) {
          next();
        } else {
          let err = new Error({ error: "Customer could not be Updated" });
          err.status = 404;
          next(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

//! ---    to delete customer must delete all table rows referencing customer.!!
//! ---   am not providing this functionality because we do not want to delete customers who have carts, orders, and payments.
const deleteCustomerById = (req, res, next) => {
  let customerId = Number(req.results.id);

  try {
    query(
      `DELETE FROM customer WHERE id = $1`,
      [customerId],
      (error, results) => {
        if (error) {
          error.status = 400;
          next(error);
        }

        if (results != undefined) {
          next();
        } else {
          let err = new Error({ error: "Could not delete customer" });
          err.status = 404;
          next(err);
        }
      }
    );
  } catch (err) {
    console.log("catch error");
    next(err);
  }
};

module.exports = {
  getCustomerId,
  deleteCustomerById,
  updateCustomerById,
  getCustomers,
  registerCustomer,
};

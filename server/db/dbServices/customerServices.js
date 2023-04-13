const { query } = require("../x-index.js");

const customerObj = (body, result) => {
  const username = body.username ? body.username : result.username;
  const pass = body.pass ? body.pass : result.pass;
  const email = body.email ? body.email : result.email;
  const first_name = body.first_name ? body.first_name : result.first_name;
  const last_name = body.last_name ? body.last_name : result.last_name;
  const address = body.address ? body.address : result.address;
  const phone = body.phone ? body.phone : result.phone;

  return { username, pass, email, first_name, last_name, address, phone };
};

async function checkUsernameExists(username) {

  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "SELECT * FROM customer WHERE username = $1 ",
        [username],
        (error, results) => {
          if (error) {
            // next(error);
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });

  return promise;
}

async function checkEmailExists(email) {

  const promise = new Promise((resolve, reject) => {
    try {
      query(
        "SELECT * FROM customer WHERE email = $1 ",
        [email],
        (error, results) => {
          if (error) {
            reject(error);
          }

          if (results === undefined || results.rows.length === 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });

  return promise;
}

async function newCustomerId() {
  const promise = new Promise((resolve, reject) => {
    try {
      query("SELECT MAX(id) FROM customer", (error, results) => {
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
}

module.exports = {
  customerObj,
  checkEmailExists,
  checkUsernameExists,
  newCustomerId
};

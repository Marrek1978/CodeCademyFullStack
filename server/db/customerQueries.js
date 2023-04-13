// const db = require("./connection");
// const { newCustomerId } = require("../db/dbServices/customerServices");
const {query} = require("./connection");

// Add your query functions here
//???       USERS       `  ?????????????????????????????????????????????????
const getUserByUsername = async (username, done) => {
  try {
    query(
      `SELECT * FROM customer WHERE username = $1 `,
      [username],
      (err, results) => {
        if (err) return done(err);

        if (results === undefined || results.rows.length === 0)
          return done(null, false, { message: "User not found" });
        return done(null, results.rows[0]);
      }
    );
  } catch (err) {
    return done(err);
  }
};

const getUserById = async (id, done) => {
  try {
    query(`SELECT * FROM customer WHERE id = $1 `, [id], (err, results) => {
      if (err) return done(err);

      if (results === undefined || results.rows.length === 0)
        return done(null, false, { message: "User not found" });
      return done(null, results.rows[0]);
    });
  } catch (err) {
    return done(err);
  }
};

const getOrCreateGitHubUser = async (profile, done) => {
  const newId = await newCustomerId();
  try {
    query(
      `SELECT * FROM customer WHERE github_id = $1 `,
      [profile.id],
      (err, results) => {
        if (err) return done(err);

        if (results === undefined || results.rows.length === 0) {
          query(
            `INSERT INTO customer (id, github_id, username, email) VALUES ($1, $2, $3, $4) RETURNING *`,
            [newId, profile.id, profile.username, profile.email],
            (err, results) => {
              if (err) return done(err);
              return done(null, results.rows[0]);
            }
          );
        } else {
          return done(null, results.rows[0]);
        }
      }
    );
  } catch (err) {
    return done(err);
  }
};

const getUserIdByGetHubId = async (gitHubId, done) => {
  try {
    query(
      `SELECT id FROM customer WHERE github_id = $1 `,
      [gitHubId],
      (err, results) => {
        if (err) return done(err);
        if (results === undefined || results.rows.length === 0)
          return done(new Error("User not found"));
        return done(null, results.rows[0].id);
      }
    );
  } catch (err) {
    return done(err);
  }
};

const registerNewUser = async (user, done) => {
  const newId = await newCustomerId();
  try {
    query(
      `INSERT INTO customer (id, username, password, email, first_name, last_name, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        newId,
        user.username,
        user.password,
        user.email,
        user.first_name,
        user.last_name,
        user.address,
        user.phone,
      ],
      (err, results) => {
        if (err) return done(err, false);
        return done(null, results.rows[0]);
      }
    );
  } catch (err) {
    return done(err);
  }
};


const newCustomerId = async() => {
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

//???????      PRODUCTS    ??????
//???????      CART    ??????

module.exports = {
  getUserByUsername,
  getUserById,
  getOrCreateGitHubUser,
  getUserIdByGetHubId,
  registerNewUser,
  newCustomerId
};

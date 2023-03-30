const { query } = require("./index.js");

const loginByUsername = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    let error = new Error("Both a username and password must be provided");
    error.status = 400;
    return next(error);
  }

  try {
    query(
      `SELECT * FROM customer WHERE username = $1`,
      [username],
      (err, results) => {
        if (err) {
          err.status = 400;
          return next(err);
        }

        if (results === undefined || results.rows.length === 0) {
          let error = new Error("Cannot find username");
          error.status = 400;
          return next(error);
        }

        if (results.rows[0].pass !== password) {
          let error = new Error("Passwords do not match");
          error.status = 400;
          return next(error);
        }

        req.session.authenticated = true;
        req.session.user = {
          username: results.rows[0].username,
          password: results.rows[0].pass,
        };

        console.log(
          "in login middleware, and auth is",
          req.session.authenticated
        );

        req.session.save(() => {
          res.redirect("/");
        });
      }
    );
  } catch (err) {
    next(err);
  }
};

async function findByUsername(username, done) {
  try {
    const result = await query(
      `SELECT id, username, pass FROM customer WHERE username = $1`,
      [username]
    );

    if (result.rows?.length) {
      let user = result.rows[0];
      return done(null, user);
    } else {
      console.log("result is null");
      return done(null, null);
    }
  } catch (err) {
    return done(err, null);
  }
}

async function findById(id, done) {
  try {
    const result = await query(`SELECT * FROM customer WHERE id = $1`, [id]);
    if (result.rows?.length) {
      done(null, result.rows[0]);
    } else {
      done(new Error("User id " + id + " does not exist"));
    }
  } catch (err) {
    return err;
  }
}

module.exports = {
  loginByUsername,
  findByUsername,
  findById,
};
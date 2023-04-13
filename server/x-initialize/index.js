// const expressInitializer = require("./express");
// const passportInitializer = require("./passport");
// const routesLoader = require("../routes");


// require("dotenv").config();
// const { PORT } = require("../config");

// const express = require("express");
// const app = express();

// const session = require("express-session");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const passport = require("passport");
// const localStrategy = require("passport-local").Strategy;
// const GitHubStrategy = require("passport-github2").Strategy;

// const bcrypt = require("bcrypt");
// const { newCustomerId } = require("../db/dbServices/customerServices");

  //*****************  DB CONNECTION  ***********************
// const { Pool } = require("pg");
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "ecommerce_project",
//   password: "postgres",
//   port: 5432,
// });
// const query = (text, params, callback) => {
//   return pool.query(text, params, callback);
// };

// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

module.exports = async () => {
  //!load swagger

  ////////////////////////////////**************************************** */



  //************************* Middleware  ***********************

  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(
  //   cors({
  //     origin: "http://localhost:5173",
  //     credentials: true,
  //   })
  // );

  // app.use(
  //   session({
  //     secret: "secretcode",
  //     resave: true,
  //     saveUninitialized: true,
  //   })
  // );

  // app.use(cookieParser("secretcode"));

  //************    passport    ****************
  // passport.use(
  //   new localStrategy(async (username, password, done) => {
  //     if (!username && !password)
  //       return done(null, false, { error: "Bad Credentials" });

  //     await getUserByUsername(username, (error, result) => {
  
  //       if (!result) return done(null, false, { error: "Bad Credentials" });
  //       if (error)
  //         return done(error, false, {
  //           error: "There was an error verifying credentials",
  //         });

  //       bcrypt.compare(password, result.password, (err, res) => {
  //         if (err)
  //           return done(err, false, {
  //             error: "There was an error verifying password",
  //           });

  //         return done(null, { result, authed: true });
  //       });
  //     });
  //   })
  // );

  // passport.use(
  //   new GitHubStrategy(
  //     {
  //       clientID: GITHUB_CLIENT_ID,
  //       clientSecret: GITHUB_CLIENT_SECRET,
  //       callbackUrl: "http://localhost:4000/auth/github/callback",
  //     },
  //     (accessToken, refreshToken, profile, done) => {
  //       getOrCreateGitHubUser(profile, (error, result) => {
  //         if (error)
  //           return done(error, false, {
  //             error: "There was an error logging in with Git hub",
  //           });
  //         return done(null, profile);
  //       });
  //     }
  //   )
  // );

  // passport.serializeUser((user, done) => {
  //   return done(null, user.id);
  // });

  // passport.deserializeUser((id, done) => {

  //   getUserById(id, (error, result) => {
  //     if (error) return done(error);
  //     return done(null, result);
  //   });
  // });

  // app.use(passport.initialize());
  // app.use(passport.session());

  //**********        RANDOM LOGGING MIDDLWARE
  // app.use((req, res, next) => {
  //   console.log("Current user:", req.user);
  //   next();
  // });

  //************    routes    ****************
  // app.get("/", (req, res) => {
  //   res.send("helolo");
  // });

  // //********************   GIT HUB LOGIN ROUTES    ***********************
  // app.get(
  //   "/auth/github",
  //   passport.authenticate("github", { scope: ["profile"] })
  // );

  // app.get(
  //   "/auth/github/callback",
  //   passport.authenticate("github", {
  //     failureRedirect: "/login",
  //   }),
  //   (req, res, next) => {
  //     const id = req.user.id;

  //     req.session.isLoggedIn = true;

  //     getUserIdByGetHubId(id, (err, localDbUserId) => {
  //       if (err) return next(err);
  //       res.send(`
  //         <script>
  //           console.log("Sending message to opener...");
  //           setTimeout(() => {
  //             window.opener.postMessage({ type: 'gitAuth', success: true, userId: '${localDbUserId}' }, '*');
  //             window.close();
  //           }, 500);
  //         </script>
  //       `);
  //     });
  //   }
  // );

  // //********************   LOGIN    ***********************
  // app.post("/login", (req, res, next) => {
  //   passport.authenticate("local", (err, user, info) => {
  //     if (err) return res.send({ error: err });
  //     if (!user) return res.send({ error: "Could not find this user" });

  //     req.logIn(user.result, (err) => {
  //       if (err) res.send({ error: "Could not log this user in" });
  //       res.send(user);
  //     });
  //   })(req, res, next);
  // });

  // //!!! *******************   REGISTER    ***********************
  // app.post("/register", async (req, res) => {
  //   //check if user exists in db
  //   try {
  //     await getUserByUsername(req.body.username, async (error, userExists) => {
  //       if (userExists)
  //         return res.send({ error: "User already exists in database" });
  //       if (error) return res.send({ error: error.message });

  //       // no user found... hash and create new user
  //       const newId = await newCustomerId();
  //       const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //       const newUser = {
  //         id: newId,
  //         username: req.body.username,
  //         password: hashedPassword,
  //         email: req.body.email,
  //         first_name: req.body.first_name,
  //         last_name: req.body.last_name,
  //         address: req.body.address,
  //         phone: req.body.phone,
  //       };

  //       registerNewUser(newUser, (error, result) => {
  //         if (error) return res.send({ error: error.message });
  //         return res.send({ result, authed: true });
  //       });
  //     });
  //   } catch (error) {
  //     res.send({ error: error.message });
  //   }
  //   // });
  // });

  // //********************   PROFILE    ***********************

  // app.post(
  //   "/customer/:customerId",
  //   (req, res, next) => {
  //     next();
  //   },
  //   ensureAuthenticated,
  //   (req, res) => {
  //     const id = parseInt(req.params.customerId, 10);
  //     getUserById(id, (error, result) => {
  //       if (error) return res.send({ error: error });
  //       return res.send({ result, authed: true });
  //     });
  //     // res.send('authed user')
  //   }
  // );

  // //********************  BOOTS   ***********************

  // app.get("/boots", ensureAuthenticated, (req, res) => {
  //   if (req.user) {
  //     res.send("authenticated");
  //   } else {
  //     res.send("not authenticated");
  //   }
  // });

  // //********************   LOGOUT    ***********************
  // app.get("/logout", ensureAuthenticated, (req, res) => {
  //   req.logout((err, user) => {
  //     if (err) return res.send({error: err});
  //     res.send({ success: true, message: "Logged out successfully" });
  //   });
  // });


  //???????           AUTH MIDDLEWARE ??????????????

  //********************   GENERAL AUTH    ***********************
  // function ensureAuthenticated(req, res, next) {
  //   if (req.isAuthenticated() || req.session.isLoggedIn) {
  //     return next();
  //   }
  //   res.send("not authenticated from ensureAuthenticated");
  // }

  //********************   SPECIFIC AUTH    ***********************

  //!    needs error route?    ****************

  // app.listen(PORT, () => {
  //   console.log(`Server listening on PORT ${PORT}`);
  // });
};

//?????????????????    DB QUERIES    ??????????????

// async function getUserByUsername(username, done) {
//   try {
//     query(
//       `SELECT * FROM customer WHERE username = $1 `,
//       [username],
//       (err, results) => {
//         if (err) return done(err);

//         if (results === undefined || results.rows.length === 0)
//           return done(null, false, { message: "User not found" });
//         return done(null, results.rows[0]);
//       }
//     );
//   } catch (err) {
//     return done(err);
//   }
// }

// async function getUserById(id, done) {
//   try {
//     query(`SELECT * FROM customer WHERE id = $1 `, [id], (err, results) => {
//       if (err) return done(err);

//       if (results === undefined || results.rows.length === 0)
//         return done(null, false, { message: "User not found" });
//       return done(null, results.rows[0]);
//     });
//   } catch (err) {
//     return done(err);
//   }
// }

// async function getOrCreateGitHubUser(profile, done) {
//   const newId = await newCustomerId();
//   try {
//     query(
//       `SELECT * FROM customer WHERE github_id = $1 `,
//       [profile.id],
//       (err, results) => {
//         if (err) return done(err);

//         if (results === undefined || results.rows.length === 0) {
//           query(
//             `INSERT INTO customer (id, github_id, username, email) VALUES ($1, $2, $3, $4) RETURNING *`,
//             [newId, profile.id, profile.username, profile.email],
//             (err, results) => {
//               if (err) return done(err);
//               return done(null, results.rows[0]);
//             }
//           );
//         } else {
//           return done(null, results.rows[0]);
//         }
//       }
//     );
//   } catch (err) {
//     return done(err);
//   }
// }

// async function getUserIdByGetHubId(gitHubId, done) {
//   try {
//     query(
//       `SELECT id FROM customer WHERE github_id = $1 `,
//       [gitHubId],
//       (err, results) => {
//         if (err) return done(err);
//         if (results === undefined || results.rows.length === 0)
//           return done(new Error("User not found"));
//         return done(null, results.rows[0].id);
//       }
//     );
//   } catch (err) {
//     return done(err);
//   }
// }

// async function registerNewUser(user, done) {
//   const newId = await newCustomerId();
//   try {
//     query(
//       `INSERT INTO customer (id, username, password, email, first_name, last_name, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
//       [
//         newId,
//         user.username,
//         user.password,
//         user.email,
//         user.first_name,
//         user.last_name,
//         user.address,
//         user.phone,
//       ],
//       (err, results) => {
//         if (err) return done(err, false);
//         return done(null, results.rows[0]);
//       }
//     );
//   } catch (err) {
//     return done(err);
//   }
// }

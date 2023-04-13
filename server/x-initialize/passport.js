const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const login = require("../db/login.js");
const bcrypt = require("bcrypt");

const { createProxyMiddleware } = require("http-proxy-middleware");

//*********** variables ****************************************************************
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

module.exports = async (app) => {
  // app.use(passport.initialize());
  // app.use(passport.session());

  //middleware for logging
  // app.use((req, res, next) => {
    // console.log("in passport.js and req.session is ", req.session);
    // console.log("req.user", req.user);
    // next();
  // });
// 
  // passport.serializeUser(function(user, done) {
  //   console.log("in serializeUser and user is ", user);
  //   done(null, user.id);
  // });

  // passport.deserializeUser(function(id, done) {
  //   // User.findById(id, function(err, user) {
  //     //   done(err, user);
  //     // });
  //     console.log("in DerializeUser");

  //   const user = { id: 123, username: "johndoeDeserializer" };
  //   done(null, user);

  // });

  // passport.use(
  //   new LocalStrategy(function (username, password, done) {
  //     // console.log(" in local strategy");
  //     login.findByUsername(username, function (err, user) {

  //       // console.log(" in findByUsername");
  //       if (err) return done(err);
  //       if (!user) return done(null, false);
  //       bcrypt.compare(password, user.password, (err, res) => {
  //         // console.log(" in bcrypt");
  //         if (err) return done(err);
  //         // console.log(" in err adn err is", err);
  //         // console.log('res   = ', res)
  //         if (res === false) return done(null, false);
  //         // console.log(" in all good form local strategy");
  //         console.log('returning user')
  //         return done(null, user);
  //       });
  //     });
  //   })
  // );

  // ? for staged testing

  // passport.use(new LocalStrategy((username, password, done) => {
  //   // Replace this with your own database query
  //   // if (username === 'admin' && password === 'password') {
  //     console.log('in local strategy')
  //     return done(null, { id: 1, username: 'localStrat' });
  //   // } else {
  //     // return done(null, false);
  //   // }
  // }));

  // passport.use(
  //   new GitHubStrategy(
  //     {
  //       clientID: GITHUB_CLIENT_ID,
  //       clientSecret: GITHUB_CLIENT_SECRET,
  //       callbackUrl: "http://localhost:4000/auth/github/callback",
  //     },
  //     (accessToken, refreshToken, profile, done) => {
  //       console.log("trying to use git auth");
  //       /// interact with DB here...
  //       return done(null, profile);
  //     }
  //   )
  // );

  // passport.serializeUser(function(user, done) {
  //   console.log("in serializeUser and user is ", user);
  //   done(null, user.id);
  // });

  // passport.deserializeUser(function(id, done) {
  //   // User.findById(id, function(err, user) {
  //     //   done(err, user);
  //     // });
  //     console.log("in DerializeUser");

  //   const user = { id: 123, username: "johndoeDeserializer" };
  //   done(null, user);

  // });

  // app.use(
  //   "/auth/github",
  //   createProxyMiddleware({
  //     target: 'https://github.com',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/github': ''
  //     }
  //   })
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());

  //**  for simple testing**************** */

  const user = {
    id: "1",
    name: "w",
    email: "w@w", // must be pointed to as usernameField: "email" in passport.use
    password: "w",
  };

  const authenticateUser = async (email, password, done) => {
    console.log("in authenticateUser");
    console.log("");
    return done(null, user);
  };

  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, user)
  })

  app.use(passport.initialize());
  app.use(passport.session()); 

  return passport;
};

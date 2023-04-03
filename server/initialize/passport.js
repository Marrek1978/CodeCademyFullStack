const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const login = require("../db/login.js");
const bcrypt = require("bcrypt");
const { PORT } = require("../config");
const { createProxyMiddleware } = require('http-proxy-middleware');

//*********** variables ****************************************************************
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
console.log(
  "GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET ",
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET
);

module.exports = (app) => {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log(" in dericalize ");
    // login.findById(id, function (err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    done(null, {id});
    // });
  });




  passport.use(
    new LocalStrategy(function (username, password, done) {
      console.log(" in local strategy");
      login.findByUsername(username, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) return done(err);
          // console.log('res   = ', res)
          if (res === false) return done(null, false);
          // console.log('returning user')
          return done(null, user);
        });
      });
    })
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackUrl: "http://localhost:4000/auth/github/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("trying to use git auth");
        /// interact with DB here...
        return done(null, profile);
      }
    )
  );

  
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


  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });

  return passport;
};

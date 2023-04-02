
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const login = require('../db/login.js')
const bcrypt = require("bcrypt");

module.exports = (app) => {
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser((user, done) => {
    console.log(' in sericalize ')
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    
    console.log(' in dericalize ')
    login.findById(id, function (err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
  });
  
  passport.use(
    new LocalStrategy(function (username, password, done) {
      console.log(' in local strategy')
      login.findByUsername(username, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, res) => {
          if(err) return done(err);
          // console.log('res   = ', res)
          if(res === false) return done(null, false);
          // console.log('returning user')
          return done(null, user);
        })
      });
    })
  );
  
  return passport;

}
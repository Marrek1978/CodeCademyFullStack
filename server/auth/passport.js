const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const bcrypt = require("bcrypt");
const {
  getUserByUsername,
  getUserById,
  getOrCreateGitHubUser,
  getUserIdByGetHubId,
} = require("../db/customerQueries");

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

module.exports = () => {
  // Passport setup code here
  // ...

  passport.use(
    new localStrategy(async (username, password, done) => {
      if (!username && !password)
        return done(null, false, { error: "Bad Credentials" });

      await getUserByUsername(username, (error, result) => {
        if (!result) return done(null, false, { error: "Bad Credentials" });
        if (error)
          return done(error, false, {
            error: "There was an error verifying credentials",
          });

        bcrypt.compare(password, result.password, (err, res) => {
          if (err)
            return done(err, false, {
              error: "There was an error verifying password",
            });

          return done(null, { result, authed: true });
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
        getOrCreateGitHubUser(profile, (error, result) => {
          if (error)
            return done(error, false, {
              error: "There was an error logging in with Git hub",
            });
          return done(null, profile);
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    getUserById(id, (error, result) => {
      if (error) return done(error);
      return done(null, result);
    });
  });

  return passport;
};

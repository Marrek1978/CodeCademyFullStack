const passport = require("passport");
const {
  getUserByUsername,
  getUserById,
  getOrCreateGitHubUser,
  getUserIdByGetHubId,
  registerNewUser,
  newCustomerId,
} = require("../db/customerQueries");
const bcrypt = require("bcrypt");
const { ensureAuthenticated } = require("../middlewares/auth");

module.exports = (app) => {

  app.get("/", (req, res) => {
    res.send("helolo");
  });

  //********************   GITHUB LOGIN     ***********************
  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["profile"] })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
      failureRedirect: "/login",
    }),
    (req, res, next) => {
      const id = req.user.id;

      req.session.isLoggedIn = true;

      getUserIdByGetHubId(id, (err, localDbUserId) => {
        if (err) return next(err);
        res.send(`
          <script>
            console.log("Sending message to opener...");
            setTimeout(() => {
              window.opener.postMessage({ type: 'gitAuth', success: true, userId: '${localDbUserId}' }, '*');
              window.close();
            }, 500);
          </script>
        `);
      });
    }
  );

  //********************   LOCAL LOGIN     ***********************
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return res.send({ error: err });
      if (!user) return res.send({ error: "Could not find this user" });

      req.logIn(user.result, (err) => {
        if (err) res.send({ error: "Could not log this user in" });
        res.send(user);
      });
    })(req, res, next);
  });

  // *******************   REGISTER    ***********************
  app.post("/register", async (req, res) => {
    //check if user exists in db
    try {
      await getUserByUsername(req.body.username, async (error, userExists) => {
        if (userExists)
          return res.send({ error: "User already exists in database" });
        if (error) return res.send({ error: error.message });

        // no user found... hash and create new user
        const newId = await newCustomerId();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
          id: newId,
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          address: req.body.address,
          phone: req.body.phone,
        };

        registerNewUser(newUser, (error, result) => {
          if (error) return res.send({ error: error.message });
          return res.send({ result, authed: true });
        });
      });
    } catch (error) {
      res.send({ error: error.message });
    }
    // });
  });

  //********************   PROFILE    ***********************

  app.post(
    "/customer/:customerId",
    (req, res, next) => {
      next();
    },
    ensureAuthenticated,
    (req, res) => {
      const id = parseInt(req.params.customerId, 10);
      getUserById(id, (error, result) => {
        if (error) return res.send({ error: error });
        return res.send({ result, authed: true });
      });
      // res.send('authed user')
    }
  );

  //********************  PRODUCTS   ***********************



  //********************   LOGOUT    ***********************
  app.get("/logout", ensureAuthenticated, (req, res) => {
    req.logout((err, user) => {
      if (err) return res.send({ error: err });
      res.send({ success: true, message: "Logged out successfully" });
    });
  });


  //********************   CART    ***********************
  //********************   ERRORS    ***********************
  return app;
};

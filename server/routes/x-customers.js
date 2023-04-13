const customer = require("../db/x-customer.js");
const util = require('util')
const {
  basicAuthentication,
  matchIdAuthentication,
  ensureAuthenticated,
} = require("./x-authMiddlewares.js");

module.exports = (app, passport) => {
  //* Original ROUTES
  //   app.param("customerId", customer.getCustomerId);

  //   app.get("/customers", customer.getCustomers, (req, res, next) => {
  //     // console.log('session id is ', req.session.id);
  //     res.status(200).json(req.results);
  //   });

  // app.post("/register", customer.registerCustomer, (req, res, next) => {
  //   console.log(' in new app route')
  //   // res.status(201).redirect("/login");
  //   // res.status(201).json({ userCreated: true, userName: req.results.username });
  //   if (req.results) {
  //     res.status(201).send({ user: req.results, isRegistered: true });
  //   } else {
  //     res.status(404).send({ isError: true, error: "Something went wrong with Registration" });
  //   }
  // });

  //   app.get("/login", (req, res, next) => {
  //     res.status(200).send({ res: "arrived at login page" });
  //   });

  //   //***********   authentication ************************ */
  //   // app.post(
  //   //   "/login",
  //   //   passport.authenticate("local", { failureRedirect: "/" }),
  //   //   function (req, res) {
  //   //     res.status(200).json({ user:req.user, authed: true });
  //   //   }
  //   // );

  //   app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  //   function(req, res) {
  //     // res.cookie('session', req.sessionID, { httpOnly: true, secure: true })
  //     console.log('in login route and req.user is ', req.user)
  //     res.status(200).json({ user:req.user, authed: true });
  //     // res.redirect('/');
  //     // res.status(200).json({ user:req.user, authed: true });
  //   });

  //   app.get("/auth/github", passport.authenticate("github", { scope: ["user"] }));

  //   app.get(
  //     "/auth/github/callback",
  //     passport.authenticate("github", {
  //       failureRedirect: "/login",
  //       // successRedirect: "/customers",
  //     }),
  //     (req, res, next) => {
  //       // const { accessToken } = req.user;
  //       console.log("accessToken is", req.isAuthenticated());
  //     }
  //   );

  //   //***********   Customers  ************************************************
  //   app.get("/customer/:customerId", ensureAuthenticated, (req, res, next) => {
  //     console.log(
  //       "in customer/:customerId route after middle ware and req.results is ",
  //       req.results
  //     );
  //     if (req.results) {
  //       console.log("in route and req.results is ", req.results);
  //       res.status(200).json(req.results);
  //     } else {
  //       console.log(" errors occured");
  //       res.status(404).json({ res: "Something went wrong" });
  //     }
  //   });

  //   app.put(
  //     "/customer/:customerId",
  //     [basicAuthentication, customer.updateCustomerById],
  //     (req, res, next) => {
  //       res.status(200).json({ res: "Customer was updated" });
  //     }
  //   );

  //   app.delete(
  //     "/customer/:customerId",
  //     [basicAuthentication, customer.deleteCustomerById],
  //     (req, res, next) => {
  //       res.status(200).json({ res: `User deleted with Id: ${req.results.id}` });
  //     }
  //   );

  //   app.get("/logout", (req, res) => {
  //     // req.logout(function (err) {
  //     //   if (err) {
  //     //     return next(err);
  //     //   }
  //     req.logout();
  //     res.redirect("/login");
  //     // });
  //   });
  // };

  // function ensureAuthenticated(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }
  //   res.redirect("/login");
  // }

  //******End of Original Routes */

  let users = [];
  app.get("/", checkAuthenticated, (req, res) => {
    res.render("index.ejs", { name: req.user.name });
  });
  
  app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login.ejs");
  });
  
  app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
  });
  
  app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = req.body.password;
      // const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      res.redirect("login");
    } catch (err) {
      res.redirect("/problems");
    }
    console.log(users);
  });
  
  app.post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("local",
     {
      successRedirect: "/",
      failureRedirect: "/problems",
      failureFlash: true,
    }
    )
  );
  
  app.get("/problems", (req, res) => {
    console.log("there was a problem");
    res.render("problems.ejs");
  });
  
  app.get("/secret", checkAuthenticated, (req, res) => {
    res.render("secret.ejs", { name: "marco " });
  });
  
  app.delete("/logout", (req, res) => {
    req.logOut((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/login");
    });
  });
  
  function checkAuthenticated(req, res, next) {
    console.log("checking if authenticated");
    if (req.isAuthenticated()) {
      console.log("authed");
      return next();
    }
    res.redirect("/problems");
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/secret");
    }
    next();
  }

  app.use((err, req, res, next) => {
    const status = err.status || 404;
    const message = err.message || "There was a problem with the request";
    res.status(status).send(message);
  });
};

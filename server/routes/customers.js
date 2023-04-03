const customer = require("../db/customer.js");
const {
  basicAuthentication,
  matchIdAuthentication,
  ensureAuthenticated
} = require("./authMiddlewares");

module.exports = (app, passport) => {
  //* ROUTES
  app.param("customerId", customer.getCustomerId);

  app.get("/customers", customer.getCustomers, (req, res, next) => {
    // console.log('session id is ', req.session.id);
    res.status(200).json(req.results);
  });

  app.post("/register", customer.registerCustomer, (req, res, next) => {
    // res.status(201).redirect("/login");
    res.status(201).json({ registered: true });
    // res.status(201).json({ userCreated: true, userName: req.results.username });
  });

  app.get("/login", (req, res, next) => {
    res.status(200).send({ res: "arrived at login page" });
  });

  //***********   authentication ************************ */
  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/customers" })
  );


  app.get("/auth/github", passport.authenticate("github", { scope: ["user"] }));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
      failureRedirect: "/login",
      // successRedirect: "/customers",
    }),
    (req, res, next) => {
      // const { accessToken } = req.user;
      console.log('accessToken is', req.isAuthenticated());
    }
  );

  //***********   Customers  ************************************************
  app.get("/customer/:customerId", ensureAuthenticated, (req, res, next) => {
    if (req.results) {
      res.status(200).json(req.results);
    } else {
      res.status(404).json({ res: "Something went wrong" });
    }
  });

  app.put(
    "/customer/:customerId",
    [basicAuthentication, customer.updateCustomerById],
    (req, res, next) => {
      res.status(200).json({ res: "Customer was updated" });
    }
  );

  app.delete(
    "/customer/:customerId",
    [basicAuthentication, customer.deleteCustomerById],
    (req, res, next) => {
      res.status(200).json({ res: `User deleted with Id: ${req.results.id}` });
    }
  );

  app.get("/logout", (req, res) => {
    // req.logout(function (err) {
    //   if (err) {
    //     return next(err);
    //   }
    req.logout();
      res.redirect("/login");
    // });
  });
};

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }

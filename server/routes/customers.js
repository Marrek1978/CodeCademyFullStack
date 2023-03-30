const customer = require("../db/customer.js");
const { basicAuthentication, matchIdAuthentication} = require('./authMiddlewares')

module.exports = (app, passport) => {

  //* ROUTES
  app.param("id", customer.getCustomerId);

  app.get("/customers", customer.getCustomers, (req, res, next) => {
    // console.log('session id is ', req.session.id);
    res.status(200).json(req.results);
  });

  app.post("/register", customer.registerCustomer, (req, res, next) => {
    res.status(201).json({ msg: "User was created " + req.results.username });
  });

  app.get("/login", (req, res, next) => {
    res.status(200).send("arrived at login page");
  });

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/customers");
    }
  );

  app.get("/customer/:id", matchIdAuthentication, (req, res, next) => {
    if (req.results) {
      res.status(200).json(req.results);
    } else {
      res.status(404).json("Something went wrong");
    }
  });

  app.put(
    "/customer/:id",
    [basicAuthentication, customer.updateCustomerById],
    (req, res, next) => {
      res.status(200).json("Customer was updated");
    }
  );

  app.delete(
    "/customer/:id",
    [basicAuthentication, customer.deleteCustomerById],
    (req, res, next) => {
      res.status(200).json(`User deleted with Id: ${req.results.id}`);
    }
  );

  app.get("/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  });

  
};


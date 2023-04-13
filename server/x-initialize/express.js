// const express = require('express');
// const app = express();
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser"); // parser middleware
const morgan = require("morgan");
const partials = require("express-partials");
const store = new session.MemoryStore();

// const bodyParser = express.urlencoded({ extended: true, limit: "50mb" });
// const jsonParser = express.json({ limit: "50mb" });

// const { SESSION_SECRET } = require("../config.js");

//? for testing
const express = require("express");
const flash = require("flash");
const methodOverride = require("method-override");

module.exports = (app) => {
  //? orginal
  // app.use(partials());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // app.use(
  //   cors({
  //     origin: ["http://localhost:5173"],
  //     methods: ["GET", "POST", "PUT", "DELETE"],
  //     // credentials: true
  //   })
  // );
  // app.use(morgan("dev"));

  // app.use(
  //   session({
  //     secret: "f4z4gs$Gcg",
  //     cookie: { maxAge: 300000000 },
  //     saveUninitialized: true,
  //     resave: false,
  //     sameSite: "none",
  //     secure:true,
  //     store,
  //   })
  // );

  // app.set("trust proxy", 1);

  //? end of original

  //**set up basic app for testing purposes
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: "yolo",
      resave: false,
      saveUninitialized: false,
      // cookie: {secure:true},
    })
  );
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
  app.use(flash());
  app.use(methodOverride("_method"));

  //?   ??????
  // app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(bodyParser.json());
  // app.use(morgan("dev"));

  return app;
};

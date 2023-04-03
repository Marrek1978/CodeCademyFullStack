const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const { SESSION_SECRET } = require("../config.js");
const { PORT } = require("../config");
const partials = require('express-partials');

const { createProxyMiddleware } = require('http-proxy-middleware');

const store = new session.MemoryStore();

module.exports = (app) => {

  
  app.use(partials());
  app.use(express.json())
  app.use(express.urlencoded({extended:true}));
  app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
  }));
  // app.use(cors());
  app.use(morgan('dev'))
  app.use(express.static('public'));
  app.set('trust proxy', 1);
  app.set("view engine", "ejs");

  app.use(
    session({
      secret: SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      // store,
    })
  );


  return app;

};

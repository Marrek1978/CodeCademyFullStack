const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const session = require("express-session");
const {SESSION_SECRET} = require('../config');

const store = new session.MemoryStore();

module.exports = (app) => {

  app.use(express.json())
  app.use(express.urlencoded({extended:true}));
  app.use(cors());
  app.use(morgan('tiny'))
  app.use(express.static('public'));
  app.set('trust proxy', 1);
  app.set("view engine", "ejs");

  app.use(
    session({
      secret: SESSION_SECRET,
      cookie: { maxAge: 300000000, secure: false },
      saveUninitialized: false,
      resave: false,
      store,
    })
  );

  return app;

};
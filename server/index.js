require('dotenv').config();

const express = require("express");
const app = express();
const {PORT} = require('./config');
const initialize = require('./initialize')

// //* load express, passport, and routes
initialize(app);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});

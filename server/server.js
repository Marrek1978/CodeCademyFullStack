
require("dotenv").config();
const { PORT } = require("./config");
const express = require("express");
const app = express();

const middleware = require("./middlewares/middleware");
const passportConfig = require("./auth/passport");
const routes = require("./routes/index.js");
// const routes = require("./routes/routes.js");

// Load middlewares
middleware(app);

// Load passport configuration
passportConfig();

// Load routes
routes(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

#!/usr/bin/env node

"use strict";
const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressValidator = require("express-validator");

const blogRoute = require("./api/routes/blogs");
const userRoute = require("./api/routes/users");
const authRoutes = require("./api/routes/auth_route"); //another route

const test = require("./api/test");
const {
  handle404Error,
  handleDevErrors
} = require("./middleware/errorHandler");

const app = express();

// Passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

const port = process.env.PORT || 3000;

const morgan = require("morgan");

const cors = require("cors");

//An express.js middleware for node-validator.
app.use(expressValidator());

app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, ,PATCH, DELETE, GET"
    );
    return res.status(200).json({});
  }
  next();
});

app.use("/api/v2/blogs", blogRoute);
app.use("/api/v2/users", userRoute);
app.use("/api/v2/user", authRoutes); //another route
app.use("/api/v2/test", test);

app.use(require("./middleware/error_middleware").all);

app.listen(port, function(err) {
  if (err) throw err;

  console.log("Blogs server listening on port %s.", port);
});

module.exports = app;

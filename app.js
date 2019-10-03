#!/usr/bin/env node

"use strict";
const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");

// const blogRoute = require("./routes/blog");
// const userRoute = require("./routes/useraccount");

const test = require("./api/test");

const app = express();

const port = process.env.PORT || 3000;

const morgan = require("morgan");

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

// app.use("/api/v2/blog", blogRoute);
// app.use("/api/v2/useraccount", userRoute);
app.use("/api/v2/test", test);

app.listen(port, function(err) {
  if (err) throw err;

  console.log("Blogs server listening on port %s.", port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {}
  });
});

module.exports = app;

#!/usr/bin/env node

"use strict";
const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");

const blogRoute = require("./api/routes/blogs");
const userRoute = require("./api/routes/users");
const authRoutes = require("./api/routes/auth_route"); //another route

const test = require("./api/test");
const {
  handle404Error,
  handleDevErrors
} = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 3000;

const morgan = require("morgan");

const cors = require("cors");

app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000
  })
);

// app.use(cors());

// app.use(
//   cors({
//     origin: "*",
//     exposedHeaders: [
//       "Content-Range",
//       "X-Content-Range",
//       "Content-Disposition",
//       "Content-Error"
//     ],
//     credentials: true
//   })
// );

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

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

app.use(require("./middleware/error_middleware").conflict);

// // catch 404 and forward to error handler
// app.use(handle404Error);

function errorHandler(err, req, res, next) {
  console.log("err status", err.status);
  console.log("error:", err);
  console.log("err.tostring()", err.toString());

  if (err.status) {
    return res.status(err.status).send(err.toString());
  }
  return res.status(500).send("Oops! Something went wrong");
}

//app.use(errorHandler);
// error handler
// app.use(async (err, req, res, next) => {
//   const environment = process.env.NODE_ENV || "development";
//   console.log("process: ", environment);

//   console.log("err.stack:", err.stack);
//   if (environment === "development") {
//     res.status(500).json(err.stack);
//   }

//   res.status(500).send("Something broke!");
// });

// // error handler
// app.use(handleDevErrors);

app.listen(port, function(err) {
  if (err) throw err;

  console.log("Blogs server listening on port %s.", port);
});

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// // eslint-disable-next-line no-unused-vars
// app.use((err, req, res, _next) => {
//   // render the error page
//   res.status(err.status || 500);
//   res.json({
//     message: err.message,
//     error: req.app.get("env") === "development" ? err : {}
//   });
// });

module.exports = app;

"use strict";

const {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  GENERIC_ERROR
} = require("../helpers/error_helper");

const badRequest = (err, req, res, next) => {
  if (err.status !== BAD_REQUEST) return next(err);

  res.status(BAD_REQUEST).send({
    ok: false,
    message: err.message || "Bad Request",
    errors: [err]
  });
};

const conflict = (err, req, res, next) => {
  if (err.status !== CONFLICT) return next(err);

  res.status(CONFLICT).send({
    ok: false,
    message: err.message || "Conflict",
    errors: [err]
  });
};

// If there's nothing left to do after all this (and there's no error),
// return a 404 error.
const notFound = (err, req, res, next) => {
  if (err.status !== NOT_FOUND) return next(err);

  res.status(NOT_FOUND).send({
    ok: false,
    message: err.message || "The requested resource could not be found"
  });
};

const genericError = (err, req, res, next) => {
  res.status(GENERIC_ERROR).send({
    ok: false,
    message: err.message || "Internal server error",
    errors: [err]
  });
};

const exportables = {
  badRequest,
  conflict,
  notFound,
  genericError
};

const all = Object.keys(exportables).map(key => {
  const value = exportables[key];
  return value;
});

module.exports = {
  ...exportables,
  all
};

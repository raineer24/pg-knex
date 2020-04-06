"use strict";

const { BAD_REQUEST } = require("../helpers/error_helper");

const badRequest = (err, req, res, next) => {
  if (err.status !== BAD_REQUEST) return next(err);

  res.status(BAD_REQUEST).send({
    ok: false,
    message: err.message || "Bad Request",
    errors: [err]
  });
};

const exportables = {
  badRequest
};

// console.log(
//   Object.keys(exportables).map(key => {
//     console.log(key);
//   })
// );

module.exports = {
  exportables
};

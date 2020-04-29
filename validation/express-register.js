//const expressValidator = require("express-validator");
const { check } = require("express-validator");
const { validationResult } = require("express-validator");
// module.exports = data = (req, res, next) => {
//   console.log("data.username: ", data);
// };

exports.validateUser = [
  check("email", "Email is required")
    .not()
    .isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log("auth controller errors", errors.array());
  }
];

// module.exports = function(data) {
//   console.log("data.username: ", data);
//   req.checkbody("email", "Email is required").notEmpty();
//   const email = data.email;
//   //console.log("email"), email;

//   return async (req, res, next) => {
//     //console.log("req.body.email", await req.body.email);
//     // req.checkbody("email", "Email is required").notEmpty();
//     // req.getValidationResult();
//   };
// };

// module.exports = async function(req, res, next) {
//   return new Promise((resolve, reject) => {
//     const foo = req.body.username;
//     resolve(foo);
//   });
// };

// module.exports = data =>
//   async function(req, res, next) {
//     console.log("data.username: ", req.body);
//   };

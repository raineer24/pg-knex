module.exports = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => next(err));
};

// /* centralizing all the errors */
//   handleExceptions: fn => (req, res, next) => {
//     fn(req, res).catch(error => {
//       next(error);
//     });
//   }

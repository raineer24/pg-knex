const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.data);
  try {
    const token = req.headers.authorization.split(" ")[1];
    //console.log(token);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("decoded: ", decoded);

    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(404).json({
      message: "Auth Failed"
    });
  }
};

// const jwt = require("jsonwebtoken");
// const resHandler = require("../utils/responseHandler");
// const checkAuth = async (req, res, next) => {
//

// try {
//   const token = req.headers.authorization.split(" ")[1];
//   console.log("token", token);
//   const decoded = jwt.verify(token, process.env.SECRET_KEY);
//   console.log("decoded", decoded);

//   //req.userData = decoded;
//   next();
// } catch (error) {
//   console.error("something wrong with auth middelware");
//   return res.status(500).json({
//     message: "Server Error"
//   });
// }
// };

//module.exports = checkAuth;

// const tokenHelper = require("../utils/tokenHelper");
// const resHandler = require("../utils/responseHandler");

// exports.verifyToken = async (req, res, next) => {
//   try {
//     if (req.get("token") == undefined || null) {
//       return res.resHandler.errorMessage(res, "no token provided", req);
//     }

//     const tokenData = await tokenHelper.verifyToken(req.get("token"));
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return resHandler.errorMessage(res, "token expired", req);
//     }
//     resHandler.errorMessage(res, "not a valid token", req);
//   }
// };

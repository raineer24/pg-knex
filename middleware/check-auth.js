const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //req.userData = decoded;
    next();
  } catch (error) {
    console.error("something wrong with auth middelware");
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

// const exportables = {
//   checkAuth
// };

module.exports = checkAuth;

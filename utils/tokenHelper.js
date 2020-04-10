/* file helps us in creating and verifying the tokens  
 for more information checkout https://www.npmjs.com/package/jsonwebtoken */
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  createToken: async data => {
    return await jwt.sign(data, config.secret_key, { expiresIn: "1h" });
  },
  verifyToken: async token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secret_key, (err, decoded) => {
        err ? reject(err) : resolve(decoded);
      });
    });
  }
};

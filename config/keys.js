if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  console.log('wtf')
  module.exports = require("./config");
}

console.log('node env', process.env.NODE_ENV);
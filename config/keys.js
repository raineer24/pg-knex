if ((process.env.NODE_ENV || '').trim() !== 'production') {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./config");
}

console.log('node env', process.env.NODE_ENV);
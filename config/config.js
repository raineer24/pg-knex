require("dotenv").config();

module.exports = {
  env: {
    port: process.env.PORT || "3000"
    //hostname: "ner-web.com"
  },
  mail: {
    host: "smtp.gmail.com",
    port: 587,
    username: "	beybladebolo24@gmail.com",
    password: "batman489~"
  },
  bycryptSalt: 13,
  secret_key: "123456",
  githubClientId: "6c8af49d7044b5cb7842",
  githubSecret:"e047ecc2218acc637590d9eccf0f2c928c784bbb"
};

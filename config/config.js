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
  }
};

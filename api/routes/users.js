const express = require("express");
const router = express.Router();
const database = require("../../config/database");

router.get("/", (req, res, next) => {
  database
    .select()
    .table("users")
    .then(data => console.log(data));
});
module.exports = router;

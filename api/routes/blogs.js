const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const bcrypt = require("bcrypt");
// Registration validation
const checkRegistrationFields = require("../../validation/register");

router.get("/", (req, res, next) => {
  database
    .select()
    .table("blogs")
    .then(data => res.json(data));
});

module.exports = router;

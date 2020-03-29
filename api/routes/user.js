const express = require("express");
const router = express.Router();
const database = require("../../config/database");

router.get("/", (req, res) => {
  res.json({
    message: "Welcome Test Development"
  });
});

module.exports = router;

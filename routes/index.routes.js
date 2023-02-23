const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");

/* GET home page */
router.get("/", isLoggedOut, (req, res, next) => {
  res.render("index");
});

module.exports = router;

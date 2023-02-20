const express = require('express');
const isLoggedOut = require('../middleware/isLoggedOut');
const router = express.Router();

/* GET home page */
router.get("/", isLoggedOut, (req, res, next) => {
  res.render("index");
});

module.exports = router;

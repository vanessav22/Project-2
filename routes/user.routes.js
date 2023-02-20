const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

// GET /users/edit-profile
router.get("homepage/edit-profile", /* isLoggedIn*/ (req, res) => {
  res.render("users/edit-profile")
})

// POST /users/edit-profile
router.post("/homepage/:id/edit-profile", async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id);
    res.redirect("/homepage");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
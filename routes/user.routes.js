const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");



router.get("/:id/dashboard", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("users/dashboard", {user});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id/profile", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("users/profile", {user});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:id/edit-profile", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id);
    res.redirect("/homepage");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id/edit-profile", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("users/edit-profile", {user});
  } catch (error) {
    console.log(error);
    next(error);
  }
});


router.get("/:id/friends", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("users/friends", { user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


router.get("/:id/progress", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user =  await User.findById(id);
    res.render("users/progress", { user });
  } catch (error) {
    console.log(error)
    next(error)
  }
});

module.exports = router;

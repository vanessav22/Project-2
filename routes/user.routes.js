const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Language = require("../models/Language.model");
const Session = require("../models/UserSession.model");
//Handles the user photos
const fileUploader = require("../config/cloudinary.config");

router.get("/:id/dashboard/:language", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { language } = req.params;
    const allUsers = await User.find();

    let users = [];

    allUsers.map((user) => {
      if (user.nativeLanguage === language) {
        users.push(user);
      }
    });

    res.render("users/dashboard-users", { users });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id/profile", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("users/profile", { user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id/dashboard", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.session.currentUser._id;
    const user = await User.findById(id);
    res.render("users/dashboard", { user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/edit-profile/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log(user);
    res.render("users/edit-profile", { user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post(
  "/edit-profile/:id",
  fileUploader.single("image"),
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { email, username } = req.body;
      let image;
      if (req.file) {
        image = req.file.path;
      } else {
        image =
          "https://res.cloudinary.com/dmm8iusle/image/upload/v1677086060/istockphoto-1125089587-170667a_gh0zbo.jpg";
      }
      let updatedUser = await User.findByIdAndUpdate(
        id,
        { email, username, image },
        { new: true }
      );
      res.redirect(`/users/${id}/profile`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.post("/:id/add-friends", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const myId = req.session.currentUser._id;
    if (req.session.currentUser.friends.includes(id)) {
      res.redirect(`/users/${myId}/dashboard`);
    } else {
      await User.findByIdAndUpdate(myId, { $push: { friends: id } });
      res.redirect(`/users/${myId}/dashboard`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id/friends", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const friend = await User.findById(id).populate("friends");
  console.log(friend);
  try {
    res.render("users/friends", { friend });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id/progress", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.render("users/progress", { user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("users/:id/", isLoggedIn, async (req, res, next) => {
  try {
    res.redirect(`/users/${id}/profile`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;

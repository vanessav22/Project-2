const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Language = require("../models/Language.model");
const UserSession = require("../models/UserSession.model");

//Handles the user photos
const fileUploader = require("../config/cloudinary.config");

router.get(
  "/:otherUserId/start-session",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { otherUserId } = req.params;
      const thisUserId = req.session.currentUser._id;

      const findSession = await UserSession.findOne({
        users: { $in: [otherUserId, thisUserId] },
      });

      if (!findSession) {
        const createSession = await UserSession.create({
          sentence: "teste",
          users: [thisUserId, otherUserId],
        });

        res.render("session/session", { otherUserId });
      }

      res.render("session/session", { otherUserId, findSession });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.post(
  "/:otherUserId/start-session",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { otherUserId } = req.params;
      const thisUserId = req.session.currentUser._id;
      const { sentence } = req.body;

      const thisSession = await UserSession.findOne({
        users: { $in: [otherUserId, thisUserId] },
      });

      const chatArray = [...thisSession.chat, sentence];

      const updateSession = await UserSession.findOneAndUpdate(
        {
          users: { $in: [otherUserId, thisUserId] },
        },
        { chat: chatArray }
      );

      res.redirect(`/session/${otherUserId}/start-session`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Language = require("../models/Language.model");
const UserSession = require("../models/UserSession.model");

//Handles the user photos
const fileUploader = require("../config/cloudinary.config");
const { findOneAndDelete } = require("../models/User.model");

      const challengeSeq = [
        "You are walking and exploring the city, but suddenly you feel hungry and you want to buy something to eat. You would like to buy a croissant with butter and one orange juice. You also would like to know how much will cost.",
        "You are entering a bakery and you would like to get some bread and a small coffee with milk to take away",
        "You need to ask somebody for directions to get to the mainstation and would like to know if you can make there on foot",
        "You are asking somebody about whether there are any events taking place the upcoming Friday",
        "You are asking somebody how their day has been and whether they have any plans for the evening"
      ];
      

router.get(
  "/:otherUserId/start-session",
  isLoggedIn,
  async (req, res, next) => {
    try {
      let randomSentence = challengeSeq[Math.floor(Math.random() * 5)]; 
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

      res.render("session/session", { otherUserId, findSession, thisUserId, randomSentence });
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

router.post("/:id/start-session/delete", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const delSess = await UserSession.findByIdAndDelete(id);
    console.log(delSess);
    res.redirect(`/users/${id}/dashboard`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;

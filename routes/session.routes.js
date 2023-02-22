const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Language = require("../models/Language.model")
const Session = require("../models/Session.model");

//Handles the user photos 
const fileUploader = require('../config/cloudinary.config');

router.get("/start-session", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);
    res.render("session/session", { session });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/start-session", isLoggedIn, async (req, res, next) => {
  try {
 const {id} = req.params
  } catch (error) {
    console.log(error);
    next(error);
  }
});





module.exports = router;
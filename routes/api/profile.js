const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const authController = require("../../controllers/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();

// @GET /api/profile/test
// @desc test profile route
// @access public

router.get("/test", (req, res) => {
  res.json({ message: "profile route" });
});

// @GET /api/profile
// @desc get current user profile
// @access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authController.currentProfile
);

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const authController = require("../../controllers/auth");
const profileController = require("../../controllers/profile");
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

// @GET /api/profile/all
// @desc get all profiles
// @access public

router.get("/all", profileController.getAllProfiles);

// @GET /api/profile/handle/:handle
// @desc get profile by handle
// @access public
router.get("/handle/:handle", profileController.getProfileHandle);

// @GET /api/profile/user/:user_id
// @desc get profile by user ID
// @access public

router.get("/user/:user_id", profileController.getProfileId);

// @POST /api/profile
// @desc create or update a profile
// @access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.createProfile
);

// @POST /api/profile/experience
// @desc add experience to profile
// @access private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  profileController.createExperience
);

// @POST /api/profile/education
// @desc add education to profile
// @access private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  profileController.createEducation
);

// @DELETE /api/profile/experience/:exp_id
// @desc delete an experience from user profile
// @access private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteExperience
);

module.exports = router;

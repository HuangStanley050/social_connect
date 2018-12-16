const User = require("../models/User");
const Profile = require("../models/Profile");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/jwtsecret");
const validateRegisterInput = require("../validation/register")
  .validateRegisterInput;
const validateLoginInput = require("../validation/login").validateLoginInput;

exports.createProfile = (req, res) => {
  const profileFields = {};
  const errors = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;

  //hobbies need to split into array
  if (typeof req.body.hobbies !== "undefined") {
    profileFields.hobbies = req.body.hobbies.split(",");
  }
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        //if it exists, it means an update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.json(err));
      } else {
        //create a new profile
        //check to see if a handle exists ---->SEO purpose
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile))
              .catch(err => res.json(err));
          })
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.status(404).json(err));
};

const User = require("../models/User");
const Profile = require("../models/Profile");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/jwtsecret");

const validateProfileInput = require("../validation/profile")
  .validateProfileInput;

const { validateExperienceInput } = require("../validation/experience");
const { validateEducationInput } = require("../validation/education");

exports.getAllProfiles = (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      console.log(err);
      errors.noprofile = "There are no profiles";
      res.status(500).json(errors);
    });
};

exports.getProfileHandle = (req, res, next) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user";
        //res.status(404).json(errors);
        throw errors;
      }
      res.json(profile);
    })
    .catch(err => {
      //res.status(500).json(err);
      next(err);
    });
};

exports.getProfileId = (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      console.log(err);
      errors.profile = "There is no profile for this user";
      res.status(404).json(errors);
    });
};

exports.createProfile = (req, res) => {
  //console.log(req.body);
  const { errors, isValid } = validateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = {};
  const errorsMsg = {};
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
              errorsMsg.handle = "That handle already exists";
              res.status(400).json(errorsMsg);
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

exports.createExperience = (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //add to experience array in Profile collection
      profile.experience.unshift(newExp);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
};

exports.createEducation = (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //add to experience array in Profile collection
      profile.education.unshift(newEdu);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
};

exports.deleteExperience = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
      const copyOfExperience = profile.experience.slice();
      copyOfExperience.splice(removeIndex, 1);
      profile.experience = copyOfExperience.slice();
      /*
      profile.experience.splice(removeIndex,1); ---->modififying the original array
      */
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
    })
    .catch(err => res.status(404).json(err));
};

exports.deleteEducation = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
      const copyOfEducation = profile.education.slice();
      copyOfEducation.splice(removeIndex, 1);
      profile.education = copyOfEducation.slice();
      /*
      profile.experience.splice(removeIndex,1); ---->modififying the original array
      */
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
    })
    .catch(err => res.status(404).json(err));
};

exports.deleteAccount_Profile = (req, res) => {
  Profile.findOneAndDelete({ user: req.user.id })
    .then(() => {
      return User.findOneAndDelete({ _id: req.user.id });
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json(err));
};

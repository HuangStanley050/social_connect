const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

exports.register = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exist" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err);
        }
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({ user: user }))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "user email not found" });
      }
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            res.json({ msg: "Success" });
          } else {
            return res.status(400).json({ password: "Not correct password" });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

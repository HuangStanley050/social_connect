const User = require("../models/User");

exports.register = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then()
    .catch();
};

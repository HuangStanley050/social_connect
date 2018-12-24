const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../../controllers/auth");

// @GET /api/users/test
// @desc test users route
// @access public

router.get("/test", (req, res) => {
  res.json({ message: "User route" });
});

// @POSt /api/users/register
// @desc register a user
// @access public

router.post("/register", authController.register);

// @POST /api/users/login
// @desc login a user returns a jwt token
// @access public

router.post("/login", authController.login);

// @GET /api/users/current
// @desc return current user
// @access private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  authController.currentUser
);

module.exports = router;

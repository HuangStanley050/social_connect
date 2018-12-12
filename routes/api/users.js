const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth");

// @GET /api/users/test
// @desc test users route
// @access public

router.get("/test", (req, res) => {
  res.json({ message: "User route" });
});

// @GET /api/users/register
// @desc register a user
// @access public

router.post("/register", authController.register);

module.exports = router;

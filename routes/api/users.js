const express = require("express");
const router = express.Router();

// @GET /api/users/test
// @desc test users route
// @access public

router.get("/test", (req, res) => {
  res.json({ message: "User route" });
});

module.exports = router;

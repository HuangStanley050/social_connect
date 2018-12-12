const express = require("express");
const router = express.Router();

// @ GET /api/posts/test
// @ desc test posts route
// @access public
router.get("/test", (req, res) => {
  res.json({ message: "post route" });
});

module.exports = router;

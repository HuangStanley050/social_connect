const express = require("express");
const Post = require("../../models/Post");
const passport = require("passport");
const postController = require("../../controllers/post");
const router = express.Router();

// @GET /api/posts/test
// @desc test posts route
// @access public
router.get("/test", (req, res) => {
  res.json({ message: "post route" });
});

// @POST /api/posts/
// @desc create a post
// @access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

module.exports = router;

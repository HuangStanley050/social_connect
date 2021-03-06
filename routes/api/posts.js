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

// @GET /api/posts
// @desc fetch posts
// @access public

router.get("/", postController.getPosts);

// @POST /api/posts/:id
// @desc fetch a single post
// @access public

router.get("/:id", postController.getPost);

// @POST /api/posts
// @desc create a post
// @access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

// @DELETE /api/posts/:id
// @desc delete a post
// @access private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

//@POST /api/posts/like/:id
// @desc like a post
// @access private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  postController.likePost
);

//@POST /api/posts/unlike/:id
// @desc unlike a post
// @access private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  postController.unLikePost
);

//@POST /api/posts/comment/:id
// @desc add a comment to a post
// @access private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  postController.addComment
);

//@DELETE /api/posts/comment/:id/:comment_id
// @desc delete a comment to a post
// @access private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  postController.deleteComment
);

module.exports = router;

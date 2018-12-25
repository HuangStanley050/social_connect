const Post = require("../models/Post");
const Profile = require("../models/Profile");
const { validatePostInput } = require("../validation/post");

exports.createPost = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.json(err));
};

exports.deletePost = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => {
          console.log(err);
          res.status(404).json({ postnotfound: "Post not found" });
        });
    })
    .catch(err => res.json(err));
};

//================ This is a function as an example to escape the .then hell from above function
//===================================================
const test_chain = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      return Post.findById(req.params.id);
    })
    .then(post => {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }
      return post.remove();
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json(err));
};
//================================================================

exports.getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err));
};

exports.getPost = (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => {
      console.log(err);
      res.status(404).json({ nopostfound: "no post found" });
    });
};

exports.likePost = (req, res, next) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      return Post.findById(req.params.id);
    })
    .then(post => {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: "User already liked this post" });
      }
      post.likes.unshift({ user: req.user.id });
      return post.save();
    })
    .then(post => res.json(post))
    .catch(err => {
      console.log(err);
      res.status(500).json({ unable: "Can't like post" });
    });
};

exports.unLikePost = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      return Post.findById(req.params.id);
    })
    .then(post => {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notliked: "You have not yet liked this post" });
      }
      /*post.likes.unshift({ user: req.user.id });
      return post.save();*/
      const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);
      return post.save();
    })
    .then(post => res.json(post))
    .catch(err => {
      console.log(err);
      res.status(500).json({ unable: "Can't like post" });
    });
};

exports.addComment = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        const error = new Error("No post found");
        //console.log(error);
        throw error;
      }
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      return post.save();
    })
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err.message));
};

exports.deleteComment = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        const error = new Error("Comment doesn't exist");
        throw error;
      }
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);
      return post.save();
    })
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err.message));
};

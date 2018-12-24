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

exports.deletePost = (req, res) => {};

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

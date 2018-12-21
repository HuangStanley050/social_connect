const Post = require("../models/Post");
const { validatePostInput } = require("../validation/post");

exports.createPost = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.name,
    user: req.user.id
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.json(err));
};

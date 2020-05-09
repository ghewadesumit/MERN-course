const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route  GET api/post
// @desc   Get all post
// @access public
router.get('/', async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error for getting all posts');
  }
});

// @route  POST api/post
// @desc   Posting a post
// @access public
router.post(
  '/',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: error.away() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      let newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      newPost = new Post(newPost);
      await newPost.save();
      res.json(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error for posting post');
    }
  }
);

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route  GET api/post
// @desc   Get all post
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error for getting all posts');
  }
});

// @route  GET api/post/my-post
// @desc   Getting a post by user Id
// @access public
router.get('/my-post', auth, async (req, res) => {
  try {
    const post = await Post.find();
    const userPost = post.find(
      (item) => item.user.toString() == req.user.id.toString()
    );
    res.json(userPost);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error for getting all posts of a user');
  }
});

// @route  GET api/post/:id
// @desc   Getting a post by post id
// @access public
router.get('/:id', auth, async (req, res) => {
  try {
    const isValidObject = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObject)
      return res.status(404).json({ msg: 'The Post id is wrong' });

    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ msg: 'Post required doesnt exist' });

    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error for getting post by post Id');
  }
});

// @route  DELETE api/post/:id
// @desc   Deleting a post by post id
// @access public
router.delete('/:id', auth, async (req, res) => {
  try {
    const isValidObject = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidObject)
      return res.status(404).json({ msg: 'The Post id is wrong' });

    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ msg: 'Post required doesnt exist' });

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User is not authorized' });

    await post.remove();
    res.json({ msg: 'post removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error for deleting post by post Id');
  }
});

// @route  POST api/post
// @desc   Posting a post
// @access Private
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

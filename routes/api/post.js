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
      const isValidObject = mongoose.Types.ObjectId.isValid(req.user.id);

      if (!isValidObject)
        return res.status(404).json({ msg: 'The Post id is wrong' });

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

// @route  PUT api/post/like/:id
// @desc   Like a post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const isValidObject = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidObject)
      return res.status(404).json({ msg: 'The Post id is wrong' });

    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((item) => item.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.push({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error for liking the post');
  }
});

// @route  PUT api/post/unlike/:id
// @desc   unLike a post
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const isValidObject = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidObject)
      return res.status(404).json({ msg: 'The Post id is wrong' });

    let post = await Post.findById(req.params.id);

    let postUser = post.likes.filter(
      (item) => item.user.toString() === req.user.id
    );

    if (postUser.length == 0) {
      return res.status(400).json({ msg: 'Already unliked or doesnt exist' });
    }

    const removeIndex = post.likes
      .map((item) => item.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error for unliking the post');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route  GET api/profile/me
// @desc   Get current user profile
// @access Private
router.get('/me', auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    console.log(profileFields.skills);

    // Build Social Object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      } else {
        console.log('not present');
        profile = new Profile(profileFields);
        await profile.save();
        // console.log(profile);
        res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
);

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user id
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const isValidObject = mongoose.Types.ObjectId.isValid(req.params.user_id);
    if (!isValidObject)
      return res.status(404).json({ msg: 'The Post id is wrong' });

    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile
// @desc   Get all profile
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/profile
// @desc   Delete profile user & profile
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove users post
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove User
    const user = await User.findById({ _id: req.user.id }).select('name');
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: ` ${user.name} profile and account deleted ` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/profile/experience
// @desc   Add or Update profile experience
// @access Private
router.put(
  '/experience',
  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        company,
        from,
        location,
        to,
        current,
        description,
      } = req.body;

      const newExp = {
        title,
        company,
        from,
        to,
        location,
        current,
        description,
      };

      try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server for finding profile Error');
      }
    } catch (err) {}
  }
);

// @route  DELETE api/profile/experience/:exp_id
// @desc   DELETE the profile experience
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const newExp = profile.experience.filter(
      (item) => item._id.toString() !== req.params.exp_id.toString()
    );
    profile.experience = [...newExp];
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error, deleting the experience');
  }
});

// @route  PUT api/profile/experience/:exp_id
// @desc   UPDATE the profile experience
// @access Private
router.put('/experience/:exp_id', auth, async (req, res) => {
  const { title, company, from, location, to, current, description } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const newExp = profile.experience.find(
      (item) => item._id.toString() == req.params.exp_id.toString()
    );
    if (!newExp) {
      res.status(400).json({ msg: `Please provide valid id` });
    }
    if (title) newExp.title = title;
    if (company) newExp.company = company;
    if (from) newExp.from = from;
    if (location) newExp.location = location;
    if (to) newExp.to = to;
    if (current) newExp.current = current;
    if (description) newExp.description = description;

    // console.log(profile.experience);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error, updating the experience');
  }
});

// @route  PUT api/profile/education
// @desc   Add or Update profile education
// @access Private
router.put(
  '/education',
  [
    auth,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      const {
        school,
        degree,
        from,
        fieldofstudy,
        to,
        current,
        description,
      } = req.body;

      const newEdu = {
        school,
        degree,
        from,
        fieldofstudy,
        to,
        current,
        description,
      };

      try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server for finding profile Error');
      }
    } catch (err) {}
  }
);

// @route  DELETE api/profile/education/:edu_id
// @desc   DELETE the profile education
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    console.log(profile);
    const newExp = profile.education.filter(
      (item) => item._id.toString() !== req.params.edu_id.toString()
    );
    profile.education = [...newExp];
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error, deleting the education');
  }
});

// @route  GET api/profile/github/:username
// @desc   Get user repos from Github
// @access Public

router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server github Error');
  }
});

module.exports = router;

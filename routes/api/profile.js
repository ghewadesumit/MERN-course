const express = require('express');
const router = express.Router();

// @route  GET api/profile
// @desc   Test route
// @access public
router.get('/', (req, res, next) => {
  return res.send('Profile Route');
});

module.exports = router;

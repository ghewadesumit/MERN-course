const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @route  POST api/users
// @desc   Register User
// @access public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with min of 6 char').isLength({
      min: 6,
    }),
  ],
  (req, res, next) => {
    /** req.body holds the object which is sent
     * from the POST request and using middleware
     * it allows it to use the object here directly
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    return res.send('User Route');
  }
);

module.exports = router;

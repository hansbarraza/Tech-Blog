//importing neccesary modules
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User } = require('../../models');
//handle user registration
router.post('/', async (req, res) => {
  try {
    // Create a new user with the data from the request body
    const userData = await User.create(req.body);
    // Save the user's session data
    req.session.save(() => {
      req.session.user_id = userData.id;//save the user ID in the session
      req.session.logged_in = true;//Set the logged_in flag in the session to true

      res.status(200).json(userData);
    });

  } catch (err) {
    console.log(err);
    res.status(400).json(err);

  }
});
//handle user login
router.post('/login', async (req, res) => {
  try {
    // Find a user with the specified email address
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400)
      .json({ message: "Incorrect email or password, try again" });
      return;
    }
     // Check if the user's password matches the provided password
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password, try again" });
      return;
    }
    // Save the user's session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//handle user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
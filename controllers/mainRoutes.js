const router = require('express').Router();
const { Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // Gets all posts and joins with user data by name.
  try {
    const postData = await Post.findAll({
      include: [
        {
        model: User,
        attributes: ['name'],
      },
      ],
    });
    // Serialize the post data so that it can be sent to the template engine
    const posts = postData.map((post) => post.get({ plain: true }));

    // passing serialized data and session flag into template
    res.render('mainpage', {
      posts,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});
// This route updates an existing post with new content.
router.post('/post/:id', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const postData = await Post.update(
      { title, content },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!postData[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/post/:id', async (req, res) => {
  // This route gets a single post by ID and joins with user data by name.
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const post = postData.get({ plain: true });
// Pass serialized data and session flag into the template
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/post/:id', withAuth, async (req, res) => {
  // This route updates an existing post with new content.
  try {
    const { title, content } = req.body;
    const postData = await Post.update(
      { title, content },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
// If no post data is returned, send a 404 status with a message
    if (!postData[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/post/:id/edit', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('editpost', {
      post,
      logged_in: true,
      id: req.params.id // pass the ID value to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//gets posts created by user logged in
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    //finds post based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// creates new post
router.post('/newpost', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    // res.status(200).json(postData);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});


//gets new post 
router.get('/newpost', withAuth, async (req, res) => {
  try {
    res.render('newpost', {
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// if user is already logged in, redirects the request to another dimension
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});


module.exports = router;
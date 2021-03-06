const express = require('express');
const userDB = require('./userDb');
const postDB = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  try {
    const newUser = {
      name: req.body.name
    }
    userDB.insert(newUser)
    .then(response => res.send(response));
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id;
  try {
    const newPost = {
      text: req.body.text,
      user_id: id
    }
    postDB.insert(newPost)
    .then(response => res.send(response));
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

router.get('/', (req, res) => {
  // do your magic!
  try {
    userDB.get()
    .then(response => res.send(response));
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  try {
    userDB.getById(id)
    .then(response => res.send(response));
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  try {
    postDB.get()
    .then(response => {
      const userPosts = response.filter(post => post.user_id === parseInt(id));
      res.send(userPosts);
    });
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  try {
    userDB.remove(id)
    .then(response => res.send({ success: response }));
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const id = req.params.id;
  try {
    const userUpdate = {
      name: req.body.name
    }
    userDB.update(id, userUpdate)
    .then(response => res.send({ success: response }))
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  userDB.getById(id)
  .then(response => {
    if(response) {
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(req.body.name) {
    next();
  } else {
    res.status(400).json({ message: "missing required name field" })
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(req.body.text) {
    next();
  } else {
    res.status(400).json({ message: "missing required text field" });
  }
}

module.exports = router;

const express = require('express');
const postDB = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  try {
    postDB.get()
    .then(response => res.send(response));
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  try {
    postDB.getById(id)
    .then(response => res.send(response));
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  try {
    postDB.remove(id)
    .then(response => res.status(204).send({ success: response}));
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id;
  try {
    const postUpdate = {
      text: req.body.text
    }
    postDB.update(id, postUpdate)
    .then(response => res.status(204).send({ success: response}));
  } catch {
    res.status(500).json({ error: 'an error has occurred' });
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  postDB.getById(id)
  .then(response => {
    if(response) {
      next();
    } else {
      res.status(400).json({ message: "invalid post id" });
    }
  })
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

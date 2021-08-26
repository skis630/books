const express = require('express');
const router = express.Router();
const authors = require('../services/authors');

/* GET authors. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await authors.getAuthors());
  } catch (err) {
    console.error(`Error while loading authors `, err.message);
    next(err);
  }
});

// Get one author
router.get('/:authorId', async function (req, res, next) {
  try {
    res.json(await authors.getAuthor(req.params.authorId));
  } catch (err) {
    console.error(`Error while loading author `, err.message);
    next(err);
  }
})

// Add author
router.post('/', async function (req, res, next) {
  try {
    res.json(await authors.addAuthor(req.body.firstName, req.body.lastName));
  } catch (err) {
    console.error(`Error while adding author `, err.message);
    next(err);
  }
})


module.exports = router;
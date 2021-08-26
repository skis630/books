const express = require('express');
const router = express.Router();
const books = require('../services/books');

/* GET books. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await books.getBooks());
  } catch (err) {
    console.error(`Error while loading books `, err.message);
    next(err);
  }
});

// Get one book
router.get('/:bookId', async function (req, res, next) {
  try {
    res.json(await books.getBook(req.params.bookId));
  } catch (err) {
    console.error(`Error while loading book `, err.message);
    next(err);
  }
})

// Add book
router.post('/', async function (req, res, next) {
  try {
    res.json(await books.addBook(req.body.bookName, req.body.isbn, req.body.author));
  } catch (err) {
    console.error(`Error while adding book `, err.message);
    next(err);
  }
})


module.exports = router;
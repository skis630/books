const express = require('express');
const router = express.Router();
const books = require('../services/books');

/* GET books. */
router.get('/', async function(req, res, next) {
  try {
    console.log(process.env.DB_USER, process.env.DB_PASSWORD);
    res.json(await books.getBooks());
  } catch (err) {
    console.error(`Error while loading books `, err.message);
    next(err);
  }
});

module.exports = router;
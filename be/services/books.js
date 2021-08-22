const db = require('./db');
const helper = require('../helper');
const config = require('../config');


const book_fields = ['bookName', 'isbn'];

async function getBooks() {
  const rows = await db.query(
    `SELECT bookName
    FROM books`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getBook(bookId) {
  const rows = await db.query(
    `SELECT books.bookName, books.isbn, authors.firstName, authors.lastName
    FROM books
    INNER JOIN authors ON books.author = authors.author_id
    WHERE book_id = ?`,
    [bookId]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

module.exports = {
  getBooks,
  getBook
}
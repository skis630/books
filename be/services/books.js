const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const authors = require('./authors');


async function getBooks() {
  const rows = await db.query(
    `SELECT books.bookName, books.isbn, authors.firstName, authors.lastName
     FROM books
     INNER JOIN authors ON books.author = authors.author_id`
  );
  const data = helper.emptyOrRows(rows);
  console.log(data);

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

async function addBook(bookName, isbn, authorFirstName, authorLastName) {
  const newAuthor = await authors.addAuthor(authorFirstName, authorLastName);
  console.log(newAuthor.data.insertId);
  const rows = await db.query(
      `INSERT INTO books (bookName, isbn, author)
       VALUES (?,?, ?)
      `,
      [bookName, isbn, newAuthor.data.insertId]
    );

    let data = await getBooks();
    data = data.data;
    console.log(data);

    return {
      data
    }
}


module.exports = {
  getBooks,
  getBook,
  addBook
}
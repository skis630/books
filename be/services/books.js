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

module.exports = {
  getBooks
}
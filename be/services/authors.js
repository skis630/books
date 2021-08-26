const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function getAuthors() {
  const rows = await db.query(
    `SELECT firstName, lastName
    FROM authors`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getAuthor(author_id) {
  const rows = await db.query(
    `SELECT firstName, lastName
    FROM authors
    WHERE author_id = ?`,
    [author_id]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function addAuthor(firstName, lastName) {
    const rows = await db.query(
        `INSERT INTO authors (firstName, lastName)
        VALUES (?,?)
        `,
        [firstName, lastName]
      );
      const data = helper.emptyOrRows(rows);

      return {
        data
      }
}


module.exports = {
  getAuthors,
  getAuthor,
  addAuthor
}
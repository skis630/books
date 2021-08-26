require('dotenv').config({path: `${__dirname}/.env`});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/books', booksRouter);

app.use('/authors', authorsRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
require('dotenv').config({path: `${__dirname}/.env`});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const booksRouter = require('./routes/books');

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
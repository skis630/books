import './App.css';
import { useEffect, useState } from 'react';

import BookList from './components/BookList';
import Form from './components/Form';
import loader from './assets/preloader.gif';

function App() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const fetchBooks = () => {
    fetch("/books")
      .then(response => response.json())
      .then((result) => setData(result.data))
      .catch(error => {
          setErr(error);
      });
  }
  useEffect(() => fetchBooks(), []);

  if (err) {
    return <div>Server error</div>
  }

  return (
    <div className="App">
      {data ?
        <header className="App-header">
          <h1>Book list</h1>
          <BookList data={data} />
          <br></br><br></br>
          <h1>Add book</h1>
          <Form updateBooks={data => setData(data)} />
        </header>
        :
        <div>Loading <img src={loader}></img></div>}
    </div>
  );
}

export default App;

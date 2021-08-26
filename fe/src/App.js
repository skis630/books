import './App.css';
import { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

function App() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const fetchBooks = () => {
    fetch("/books")
      .then(response => response.json())
      .then((result) => setData(result))
      .catch(error => {
          setErr(error);
          console.error('Error occurred: ', error)
      });
  }
  useEffect(() => fetchBooks(), []);

  if (err) {
    return <div>Server error</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book list</h1>
        <Accordion>

        </Accordion>
      </header>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  // Fetch random quote from API
  const fetchQuote = async () => {
    try {
      const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // Save the quote to the list
  const saveQuote = () => {
    if (!savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  return (
    <div className="app-container">
      <div className="quote-card">
        <p>{quote}</p>
        <button onClick={fetchQuote} className="button-primary">New Quote</button>
        <button onClick={saveQuote} className="button-secondary">Save to List</button>
      </div>

      <div className="saved-quotes">
        <h3>Saved Quotes</h3>
        {savedQuotes.length > 0 ? (
          <ul>
            {savedQuotes.map((savedQuote, index) => (
              <li key={index} className="quote-item">{savedQuote}</li>
            ))}
          </ul>
        ) : (
          <p>No quotes saved yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;

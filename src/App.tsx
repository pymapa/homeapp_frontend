import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pyry's best home app</h1>
        <h3>Such high tech {process.env.REACT_APP_API_URL}</h3>
      </header>
    </div>
  );
}

export default App;

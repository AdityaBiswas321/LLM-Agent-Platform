// src/App.js
import React from 'react';
import Canvas from './components/Canvas';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>LLM Workflow Canvas</h1>
      </header>
      <Canvas />
    </div>
  );
}

export default App;

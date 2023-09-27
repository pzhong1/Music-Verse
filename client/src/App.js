import React from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import SearchMusic from "./components/SearchBar";

function App() {
  return (
    <Router>
      <div className="App">
        <HomePage />
        <SearchMusic />
      </div>
    </Router>
  );
}

export default App;

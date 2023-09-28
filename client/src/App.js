import React, { useState, useEffect } from "react";
import './App.css'; // Global styles
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/HomePage";
import SearchBar from "./components/SearchBar";
import DarkModeContext from "./DarkModeContext";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchBar />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;

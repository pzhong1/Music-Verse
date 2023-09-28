import React, { useState, useEffect, useContext } from "react";
import API from "../utils/api";
import '../styles/SearchBar.css';
import Rating from './Rating.js'; // Import Rating component
import DarkModeContext from '../DarkModeContext';
import Comments from './Comments'; // Import Comments component
import Navbar from './Navbar'; // Import Navbar component

function SearchBar() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const searchMusic = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.searchMusic(query);
      setResults(response.data.tracks.items);
    } catch (error) {
      console.error("Error fetching music:", error);
      setError("Failed to fetch music. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (rating) => {
    console.log('Selected Rating:', rating);
    // Here you can handle the selected rating
  };

  return (
    <>
      <Navbar /> {/* Render Navbar component */}
      <div className="search-bar">
        <h1>Search for Music</h1>
        
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>

        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter music or artist" />
        <button onClick={searchMusic} disabled={loading}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
  {results.slice(0, 5).map((item) => (
    <div className="music-card" key={item.id}>
      <img className="album-cover" src={item.album.images[0]?.url} alt="Album Cover" />
      <div className="music-details">
        <h3>{item.name} by {item.artists[0].name}</h3>
        <p>Release Date: {item.album.release_date}</p>
        {item.preview_url && (
          <audio controls>
            <source src={item.preview_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        <Rating onRatingChange={handleRatingChange} />
        <Comments />
      </div>
    </div>
  ))}
</div>
      </div>
    </>
  );
}

export default SearchBar;

import React, { useState } from "react"; // import react and useState hook
import API from "../utils/api"; // import api, so this file can communicated with server api

function SearchBar() {
  const [query, setQuery] = useState(""); //set this hook for user to search for music or artist
  const [results, setResults] = useState([]); // set this hook to update search result
  const [loading, setLoading] = useState(false); // set this = false, only display loading string when user enter something in search bar
  const [error, setError] = useState(null); // if something wrong then display soemthing wrong

  // request spotifty api from server
  const searchMusic = async () => {
    setLoading(true); // display 'loading' when user searching something
    setError(null); // auto delete error msg if search result is succsful
    try {
      const response = await API.searchMusic(query); // use API for searching
      setResults(response.data.tracks.items);
    } catch (error) {
      // if something wrong then display error msg
      console.error("Error fetching music:", error);
      setError("Failed to fetch music. Please try again.");
    } finally {
      setLoading(false); // hide loading when search is done
    }
  };

  // display on website
  return (
    <div>
      <h1>Search for Music</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter music or artist" // search bar
      />

      {/* onclick method for when user click search */}
      <button onClick={searchMusic} disabled={loading}>
        Search
      </button>

      {/* display loading when user seaching for something */}
      {loading && <p>Loading...</p>}

      {/* display error if something wrong */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* after searching is sccussful display result */}
      <div>
        {results.map((item) => (
          <div className="music-card" key={item.id}>
            {/* images */}
            <img
              src={item.album.images[0]?.url}
              alt="Album Cover"
              style={{ width: "100px", height: "100px" }}
            />

            {/* music name and artists */}
            <div className="music-details">
              <h3>
                {item.name} by {item.artists[0].name}
              </h3>

              {/* the relase date  the music  */}
              <p>Release Date: {item.album.release_date}</p>

              {/* if the api has url for demo then user can listen to the song for 30sec */}
              {item.preview_url && (
                <audio controls>
                  <source src={item.preview_url} type="audio/mpeg" />
                  Opps! this does not support the audio element.
                </audio>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//export it so other file can use it
export default SearchBar;

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import Navbar from "./Navbar"; // Import Navbar component
import DarkModeContext from "../DarkModeContext";
import Loading from "./Loading";
import Rating from "./Rating";
import Comments from "./Comments";
import "../styles/MusicDetail.css";

const MusicDetail = () => {
  const { id } = useParams();
  const [musicData, setMusicData] = useState(null);
  const [averageRating, setAverageRating] = useState(null); // State to store average rating
  const [loading, setLoading] = useState(true);
  const isDarkMode = useContext(DarkModeContext);

  useEffect(() => {
    const minimumLoadingTime = 1700;

    const fetchMusicData = async () => {
      try {
        const response = await API.getMusicById(id);
        setMusicData(response.data);
        // Assuming your API response contains an averageRating field
        setAverageRating(response.data.averageRating); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchMusicData();

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, minimumLoadingTime);

    return () => clearTimeout(loadingTimeout);
  }, [id]);

  if (loading) return <Loading />;

  return (
    <>
    <Navbar />
    <div className={`music-detail-container ${isDarkMode ? 'dark-mode-text' : ''}`}>
      <img src={musicData.album.images[0]?.url} alt="Album Cover" />
      <h3 className={isDarkMode ? 'dark-mode-text' : ''}>
        {musicData.name} by {musicData.artists[0].name}
      </h3>
      <p className={isDarkMode ? 'dark-mode-text' : ''}>Release Date: {musicData.album.release_date}</p>
      <audio controls>
        <source src={musicData.preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Rating/> {/* Pass the average rating to the Rating component */}
      <Comments musicId={id} comments={musicData.comments} />
    </div>
    </>
  );
};

export default MusicDetail;

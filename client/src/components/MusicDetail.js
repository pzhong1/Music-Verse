import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import Rating from "./Rating";
import Comments from "./Comments";

const MusicDetail = () => {
  const { id } = useParams();
  const [musicData, setMusicData] = useState(null);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await API.getMusicById(id);
        setMusicData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMusicData();
  }, [id]);

  if (!musicData) return <p>Loading...</p>;

  return (
    <div>
      <img src={musicData.album.images[0]?.url} alt="Album Cover" />
      <h3>
        {musicData.name} by {musicData.artists[0].name}
      </h3>
      <p>Release Date: {musicData.album.release_date}</p>
      <audio controls>
        <source src={musicData.preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Rating />
      <Comments musicId={id} comments={musicData.comments} />
    </div>
  );
};

export default MusicDetail;

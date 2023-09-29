import axios from "axios"; //import axios packge for request http

//get http request for 3001
const searchMusic = (query) => {
  return axios.get(`http://localhost:3001/search?q=${query}`);
};

const getMusicById = (id) => {
  return axios.get(`http://localhost:3001/music/${id}`);
};

////////////
const addComment = (musicId, comment) => {
  return axios.post(`http://localhost:3001/api/comments`, { musicId, comment });
};

const getCommentsByMusicId = (musicId) => {
  return axios.get(`http://localhost:3001/api/comments/${musicId}`);
};

////////////

const API = {
  searchMusic,
  getMusicById,
  addComment,
  getCommentsByMusicId,
};

export default API;

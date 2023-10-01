import axios from "axios"; //import axios packge for request http

//get http request for 3001
const searchMusic = (query) => {
  return axios.get(`/search?q=${query}`);
};

const getMusicById = (id) => {
  return axios.get(`http://localhost:3001/music/${id}`);
};

////////////ADD comments////////////
const addComment = (musicId, comment, rating) => {
  return axios.post(`http://localhost:3001/api/comments`, {
    musicId,
    comment,
    rating,
  });
};
///////GET comments ///////////
const getCommentsByMusicId = (musicId) => {
  return axios.get(`http://localhost:3001/api/comments/${musicId}`);
};

////////////DELETE comments/////////////
const deleteComment = (commentId) => {
  return axios.delete(`http://localhost:3001/api/comments/${commentId}`);
};

const API = {
  searchMusic,
  getMusicById,
  addComment,
  getCommentsByMusicId,
  deleteComment,
};

export default API;

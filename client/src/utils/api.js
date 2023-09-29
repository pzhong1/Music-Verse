import axios from "axios"; //import axios packge for request http

//get http request for 3001
const searchMusic = (query) => {
  return axios.get(`/search?q=${query}`);
};

const API = {
  searchMusic,
};

export default API;

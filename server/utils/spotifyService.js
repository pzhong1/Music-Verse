const axios = require("axios"); //import axios for request HTTP in node or client
require("dotenv").config();

const baseURL = "https://api.spotify.com/v1"; //spotify URL
const clientID = process.env.SPOTIFY_CLIENT_ID; // hided my id in my .env file
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // hided my key in my .env file

let token;

const getToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          grant_type: "client_credentials",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${clientID}:${clientSecret}`
          ).toString("base64")}`,
        },
      }
    );
    token = response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify token", error);
  }
};

//use async search music
const searchMusic = async (query) => {
  try {
    // if token is emtpy then get token first
    if (!token) {
      await getToken();
    }
    //use axios send GET resqust to spotify search port
    const response = await axios.get(`${baseURL}/search`, {
      params: {
        q: query, //search for string(music name or author......)
        type: "track",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; //return search result
  } catch (error) {
    console.error("Error searching music", error);
    throw error;
  }
};

//export this file so other file can use or share it
module.exports = {
  searchMusic,
};

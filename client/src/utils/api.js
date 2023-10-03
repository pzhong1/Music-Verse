import axios from "axios"; //import axios packge for request http
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ADD_USER } from './mutations';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

//get http request for 3001
const searchMusic = (query) => {
  console.log(`Searching for music with query: ${query}`);
  return axios.get(`/search/${query}`);
};

const getMusicById = (id) => {
  return axios.get(`http://localhost:3001/music/${id}`);
};

////////////ADD comments////////////
const addComment = (musicId, comment, rating, date) => {
  return axios.post(`http://localhost:3001/api/comments`, {
    musicId,
    comment,
    rating,
    date,
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

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;


const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

const loginUser = async (email, password) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { email, password }
    });

    // Check if the response contains data and a token
    if (data && data.login && data.login.token) {
      return data.login; // Return the login data
    } else {
      throw new Error('Authentication failed'); // Throw a generic error if the response is not as expected
    }
  } catch (error) {
    console.error('There was a problem with the authentication:', error.message);
    return { error: 'Authentication failed' }; // Return a generic error message
  }
};

const signupUser = async (username, email, password) => {
  const { data } = await client.mutate({
    mutation: ADD_USER,
    variables: { username, email, password }
  });
  return data.addUser;
};

const API = {
  searchMusic,
  getMusicById,
  addComment,
  getCommentsByMusicId,
  deleteComment,
  loginUser,
  signupUser,
};

export default API;

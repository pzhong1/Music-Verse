import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`;


export const ADD_POST = gql`
    mutation addPost($userId: ID!, $post: String!) {
        addPost(userId: $userId, post: $post) {
            id
            username
            post
        }
    }
`;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;



export  const REMOVE_POST = gql`
    mutation removePost($post: String!) {
        removePost(post: $post) {
            id
            username
            post
        }
    }
`;

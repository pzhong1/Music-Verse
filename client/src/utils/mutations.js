import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($name: String!, $email: String!, $password: String!) {
        token
        user {
            _id
            name
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost($userId: ID!, $post: String!) {
        addPost(userId: $userId, post: $post) {
            _id
            name
            post
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export  const REMOVE_POST = gql`
    mutation removePost($post: String!) {
        removePost(post: $post) {
            _id
            name
            post
        }
    }
`;

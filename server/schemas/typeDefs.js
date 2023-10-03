const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  email: String
  posts: [Post]!
}

  type Friend {
    id: ID!
    username: String!
    userId: ID!

  }

  type Post {
    id: ID!
    userId: String
    postText: String!
  }

  type Comment {
    id: ID!
    userId: ID!
    musicId: ID!
    comment: String! 
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: [User]!
    getUser(userId: ID!): User
    me: User
    getPost(postId: ID!): Post
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addPost(userId: ID!, postText: String!):Post
    removeUser(userId: ID!): User
    removePost(post: String!): User
    addComment(postId: ID!, userId: ID!, comment: String!): Comment
    addFriend(userId: ID!, friendId: ID!): User
  }
`;

module.exports = typeDefs;

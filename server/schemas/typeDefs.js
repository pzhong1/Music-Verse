const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  email: String
  posts: [String]!
}

  type Friend {
    id: ID
    userId: ID
  }

  type Post {
    id: ID!
    userId: ID!
    content: String!
  }

  type Comment {
    id: ID!
    userId: ID!
    commentId: ID!
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

    addPost(userId: ID!, post: String!): User
    removeUser(userId: ID!): User
    removePost(post: String!): User
    addComment(postId: ID!, userId: ID!, comment: String!): Comment
    addFriend(userId: ID!, friendId: ID!): User
  }
`;

module.exports = typeDefs;

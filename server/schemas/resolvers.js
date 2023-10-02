const { User, Post, Comment } = require("../models");
//import { User } from '../models';
const { signToken, AuthenticationError } = require("../utils/auth");
const { GraphQLError } = require("graphql");

//import { signToken } from '../utils/auth';

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },

    getUser: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate("posts");
    },
    /////////////this is new/////////////////////////
    ///added this for adding comments
    getPost: async (parent, { postId }) => {
      return Post.findById(postId).populate("comments");
    },

    //////////////////////////////////////////////
  },

  //add User profile to app
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user: user };
      } catch (err) {
        console.error(err);
        throw new Error('Error creating user');
      }
    },  

    //allow User to login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const rightPW = await user.isCorrectPassword(password);

      if (!rightPW) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    addFriend: async (parent, { userId, friendId }, context) => {
      // if check passses USER is authenticated
      if (context.user) {
        // this means we HAVE a user to query for --> ADD a NEW FRIEND to the current user

        return user;
      }
    },

    //User can add a post once logged in
    addPost: async (parent, { userId, post }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: userId },
          {
            $addToSet: { posts: post },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("Must be logged in!");
      // throw new GraphQLError("Must be logged in!")
    },

    removeUser: async (parent, { userId }, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to login");
    },

    removePost: async (parent, { post }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post } },
          { new: true }
        );
      }
      throw new AuthenticationError("Need to be login");
    },
    ////////////////////////////////////////////////////////////////////////////////

    addComment: async (parent, { postId, userId, comment }, context) => {
      if (context.user) {
        try {
          //////this is new////
          console.log("UserId: ", userId);
          ////////////////
          const newComment = await Comment.create({
            postId,
            userId,
            comment,
          });
          await Post.findByIdAndUpdate(postId, {
            $push: { comments: newComment.id },
          });
          return newComment;
        } catch (error) {
          throw new Error("Error adding comment: ", error);
        }
      }
      throw new AuthenticationError("Must be logged in to add a comment!");
    },   
  },
};

module.exports = resolvers;

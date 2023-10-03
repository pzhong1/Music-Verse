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
      // if check passes USER is authenticated
      if (context.user) {
        // this means we HAVE a user to query for --> ADD a NEW FRIEND to the current user

        return user;
      }
    },

    //User can add a post once logged in
    addPost: async (parent, { userId, postText }, context) => {
      if (context.user) {
        // First Create the New Post --> { id: "", userId: userId, content: post}
        const newPost = await Post.create({ postText, userId});
        console.log("Newly created Post Obj: ", newPost)
        // Then we can Add the Association

      await User.findByIdAndUpdate(
        //  { _id: userId },
          { _id: userId},
          {
            $addToSet: { posts: newPost },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
      // throw new GraphQLError("Must be logged in!")
    },

    /*removeUser: async (parent, { userId }, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },*/

    removeUser: async (parent, { username, email, password }) => {
      try{
        const deleteUser = await User.findOneAndDelete({username, email, password});
        console.log("Delete User Instance: ", deleteUser);
        // If additional Authentication Needed
          // create a new token
          const token = signToken(deleteUser);
          // we want to return an AUTH datatype
          return { token, deleteUser };
        } catch (err) {
          console.log(err);
          throw err;
        }
       
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        try {
          // Find the post by its ID and store it before removing
          const removedPost = await Post.findByIdAndRemove(postId);
          
          if (!removedPost) {
            throw new Error("Post not found");
          }
          
          // Remove the association from the user's posts array
          await User.findByIdAndUpdate(
            context.user._id,
            {
              $pull: { posts: postId },
            },
            {
              new: true,
            }
          );
    
          return removedPost;
        } catch (error) {
          throw new Error("Unable to remove the post");
        }
      } else {
        throw new AuthenticationError("You must be logged in to remove a post");
      }
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
      throw  AuthenticationError;
    },   
  },
};

module.exports = resolvers;

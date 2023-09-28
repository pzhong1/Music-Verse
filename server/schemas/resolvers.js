const AuthenticationError = require('apollo-server-express')
//import { AuthenticationError } from 'apollo-server-express';
const { User, Post } = require('../models');
//import { User } from '../models';
const signToken = require('../utils/auth')
//import { signToken } from '../utils/auth';

const resolvers = {
    Query: {
        user: async () => {
            return User.find({});
        },
    
        getUser: async (parent, { userId }) => {
            return User.findOne({ _id: userId})
            .populate("posts");
        },

    },
    




    //add User profile to app
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            try {
                console.log("Username: ", username);
                console.log("Email: ", email);
                console.log("Pass: ", password);
                const newUser = await User.create({username, email, password});
                // If additional Authentication Needed
                return newUser;
            } catch(err) {
                console.log(err);
                throw err;
            }
        },
    
        //allow User to login
        login: async ( parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('No such user found with this email!');
            }

                const rightPW = await User.isCorrectPassword(password);

            if(!rightPW) {
                throw new AuthenticationError('Incorrect Password!');
            }
            
            const token = signToken(user);
            return { token, user };
        },

        addFriend: async ( parent, { userId, friendId }, context ) => {
            if(context.user) {

            }
        },

        //User can add a post once logged in
        addPost: async ( parent, { userId, post }, context ) => {
            if(context.user) {
                return User.findByIdAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: { posts: post },
                    },
                    {
                        new:true,
                        runValidators:true,
                    }
                );
                
            }
            throw new AuthenticationError('Must be logged in!');
        },

        removeUser: async ( parent, { userId }, context ) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id});
            }
            throw new AuthenticationError('You need to login');
        },

        removePost: async ( parent, { post }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: { posts: post } },
                    { new:true }
                );
            }
            throw new AuthenticationError('Need to be login')
        },

        addComment: async ( parent, { postId, comment }, context ) => {
            if(context.post) {
                return await Post.findOneAndUpdate(
                    { _id: context.post._id},
                    { $push: {comments: comment} },
                    { new: true }
                )
            }
        }
    }

}


module.exports = resolvers; 
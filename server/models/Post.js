const { model, Schema } = require('mongoose');

const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 560,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    postText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 560,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
},
{
    toJSON: {
        getters: true,
    },
    id: false,
});

const Comment = model('Comment', CommentSchema);
const Post = model('Post', PostSchema);

module.exports = { Post, Comment };

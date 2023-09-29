const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;

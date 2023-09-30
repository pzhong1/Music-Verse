const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  musicId: {
    type: String,
    ref: "Post",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;

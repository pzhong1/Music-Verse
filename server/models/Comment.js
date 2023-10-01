const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  musicId: {
    type: String,
    ref: "Post",
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  // rating //////
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;

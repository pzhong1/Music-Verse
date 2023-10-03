const { model, Schema } = require("mongoose");



const postSchema = new Schema(
  {
   
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    postText: {
      type: String,
      required: true,
      minLength: 1,
      max_Length: 560,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Post = model("Post", postSchema);
// const Post = model('Post', { postSchema, commentSchema });

module.exports = Post;

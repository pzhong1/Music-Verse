const express = require("express");
//require("dotenv").config(); // import dotenv package for get info from .env file
const spotifyService = require("./utils/spotifyService");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors"); // Import the cors middleware
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const Comment = require("./models/Comment");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Enable CORS for all routes
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // To handle JSON requests

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
////////search music//////////
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    console.log(`Received search query: ${query}`);
    const results = await spotifyService.searchMusic(query);
    console.log("Search operation completed successfully");
    res.json(results);
  } catch (error) {
    console.error("Error in /search route:", error);
    res.status(500).json({ error: error.message });
  }
});

/////GET ID////
app.get("/music/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const musicData = await spotifyService.getMusicById(id);

    const comments = await Comment.find({ musicId: id });
    musicData.comments = comments;

    res.json(musicData);
  } catch (error) {
    res.status(500).send("Server error");
  }
});
///POST for comments/////
app.post("/api/comments", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { musicId, comment, rating } = req.body;

    ////////////////
    if (!musicId || !comment) {
      return res.status(400).send("musicId and comment are required");
    }

    const newComment = new Comment({
      musicId: musicId,
      comment: comment,
      rating: rating,
    });
    await newComment.save();

    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving comment");
  }
});

app.get("/api/comments/:musicId", async (req, res) => {
  try {
    const musicId = req.params.musicId;
    const comments = await Comment.find({ musicId: musicId });
    res.json(comments);
  } catch (error) {
    res.status(500).send("Error fetching comments");
  }
});

////DELETE comments////

app.delete("/api/comments/:id", async (req, res) => {
  try {
    const commentId = req.params.id;

    // check if id exsits
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).send("Invalid commentId");
    }

    // use Mongoose delete comment
    const result = await Comment.findByIdAndDelete(commentId);

    // if there is no comment then send 404 error code
    if (!result) {
      return res.status(404).send("Comment not found");
    }

    // if delete success
    res.send("Comment deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/////////POST for Rating///////////
app.post("/api/rating", async (req, res) => {
  console.log(req.body);
  const { rating, musicId, userId } = req.body;

  try {
    const comment = await Comment.findOne({ musicId, userId });
    if (comment) {
      comment.rating = rating;
      await comment.save();
    } else {
      const newComment = new Comment({ musicId, userId, rating });
      await newComment.save();
    }
    res.status(200).json({ message: "Rating saved successfully", rating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
//////////////////////////////////////////

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();

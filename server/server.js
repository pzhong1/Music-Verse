const express = require("express");
//require("dotenv").config(); // import dotenv package for get info from .env file
const spotifyService = require("./utils/spotifyService");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors"); // Import the cors middleware
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Enable CORS for all routes
app.use(cors("http://localhost:3001/"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // To handle JSON requests

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const results = await spotifyService.searchMusic(query);
    res.json(results);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

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

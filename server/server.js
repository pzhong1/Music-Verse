const express = require("express");
require("dotenv").config(); // import dotenv package for get info from .env file
const spotifyService = require("./utils/spotifyService");
const cors = require("cors");
const path = require("path");
const { ApolloServer } = require('apollo-server-express');
const app = express();

app.use(cors());

app.use(express.json()); // To handle JSON requests
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const results = await spotifyService.searchMusic(query);
    res.json(results);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware,
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 3001;

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};
  
// Call the async function to start the server
startApolloServer();
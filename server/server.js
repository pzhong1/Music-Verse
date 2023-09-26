const express = require("express");
const connectDB = require("./config/connection");

const app = express();
connectDB();

const PORT = process.env.PORT || 3003;

// routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

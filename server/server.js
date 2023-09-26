const express = require("express");
const connectDB = require("./config/connection");
const path = require("path");

const app = express();
connectDB();

const PORT = process.env.PORT || 3003;

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const path = require("path");
const express = require("express");
const app = express();

const root = path.join(__dirname, "../");
app.use(express.static(path.join(root, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

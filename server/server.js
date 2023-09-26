const path = require("path");
const express = require("express");
const app = express();

const root = path.join(__dirname, "../");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(root, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(root, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

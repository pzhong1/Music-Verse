const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV) {
  app.use(express.static("app/client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "app/client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

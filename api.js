const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

const app = express();
const port = process.env.PORT || 9090;

app.use(express.json());
/**
 * Authentication EndPoint
 */
app.use("/api/auth", authRoutes);

/**
 * Posts EndPoint
 */
app.use("/api/posts", postsRoutes);

/**
 * Comments EndPoint
 */
app.use("/api/comments", commentsRoutes);


/**
 * Serving our Frontend
 */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Up and running on port ${port}...`));

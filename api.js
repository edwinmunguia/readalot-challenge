const express = require("express");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");

const app = express();
const port = 9090;

//Middlewares
app.use(express.json());

/**
 * Authentication
 */
app.use("/api/auth", authRoute);

/**
 * Posts Routes
 */
app.use("/api/posts", postsRoute);

/**
 * Comments Routes
 */
app.use("/api/comments", postsRoute);

app.listen(port, () => console.log(`Up and running on port ${port}...`));

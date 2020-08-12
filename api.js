const express = require("express");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();
const port = 9090;


// "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",

//Middlewares
app.use(express.json());

/**
 * Post Routes
 */
app.use("/api/posts", postRoute);

/**
 * Authentication
 */
app.use("/api/auth", postRoute);

app.listen(port, () => console.log(`Up and running on port ${port}...`));

const express = require("express");
const app = express();
const port = 9090;

const posts = [
  {
    id: 1,
    slug: "the-js-book",
    title: "The Js Book",
    summary: "lorem ipsum naaondsoidnioasndioasdasd",
    category: "JS, Web Dev",
    date: "115151516156",
  },
  {
    id: 2,
    slug: "the-Node-book",
    title: "The Node Book",
    summary: "lorem ipsum naaondsoidnioasndioasdasd",
    categories: "Node, Backend",
    date: "115151516156",
  },
  {
    id: 3,
    slug: "the-js-book",
    title: "The Js Book",
    summary: "lorem ipsum naaondsoidnioasndioasdasd",
    categories: "JS, Frontend",
    date: "115151516156",
  },
];

const generateError = (message) => ({
  error: message,
});

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts.find(item => item.id === Number(postId));
  if (post) res.json(post);
  else res.json(generateError("This post doesn't exist."));
});

app.listen(port, () => console.log(`Up and running on port ${port}...`));

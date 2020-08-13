const router = require("express").Router();
const pool = require("../database");
const utils = require("../utils");
const { validatePostData } = require("../datavalidation");
const verifyToken = require("../middlewares/verifytoken");

/**
 * Retrieve posts list
 */
router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT p.id, p.title, p.slug, p.content, p.summary, p.image, " +
      "p.categories, p.published_on, u.id as author_id, u.username as author_username " +
      "FROM posts p LEFT JOIN users u ON p.author = u.id ORDER BY id DESC"
  );
  res.json(result.rows);
});

/**
 * Retrieve a single post
 */
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query(
    "SELECT p.id, p.title, p.slug, p.content, p.summary, p.image, " +
      "p.categories, p.published_on, u.id as author_id, u.username as author_username " +
      "FROM posts p LEFT JOIN users u ON p.author = u.id WHERE p.id=$1 LIMIT 1",
    [id]
  );
  if (result.rows.length > 0) res.json(result.rows[0]);
  else
    res.json(
      utils.generateError("This post doesn't exist or has been removed.")
    );
});

/**
 * Create a new post
 */
router.post("/", verifyToken, async (req, res) => {
  const { title, content, categories } = req.body;
  const author = req.user;

  try {
    //Validate post data
    const { error } = validatePostData({
      title,
      content,
    });

    //Is there and error? Let the user know it.
    if (error)
      res.status(400).json(utils.generateError(error.details[0].message));

    const slug = await utils.generateSlug(title);
    const summary = await utils.extractSummary(content, 240);
    const foundImage = await content.match(/!\[.*?\]\((.*?)\)/);
    let image = "";
    if (foundImage) image = foundImage[1];

    const result = await pool.query(
      "INSERT INTO posts (title, slug, summary, content, image, author, categories, published_on) VALUES($1, $2, $3, $4, $5, $6, $7, NOW())",
      [title, slug, summary, content, image, Number(author.id), categories]
    );

    if (result) {
      res.json(result.rows[0]);
    }
  } catch (e) {
    console.log(e);
    res.json(utils.generateError("Something went wrong, try again."));
  }
});

module.exports = router;

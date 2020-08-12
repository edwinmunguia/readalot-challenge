const router = require("express").Router();
const pool = require("../database");
const utils = require("../utils");

/**
 * Retrieve posts list
 */
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");
  res.json(result.rows);
});

/**
 * Retrieve a single post
 */
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query("SELECT * FROM posts WHERE id=$1 LIMIT 1", [
    id,
  ]);
  if (result.rowCount > 0) res.json(result.rows);
  else
    res.json(
      utils.generateError("This post doesn't exist or has been removed.")
    );
});

/**
 * Create a new post
 */
router.post("/", async (req, res) => {
  const { title, content, categories } = req.body;
  const result = await pool.query(
    "INSERT INTO posts (title, slug, summary, content, image, author, categories, published_on) VALUES($1, $2, $3, $4, $5, $6, $7, NOW())",
    [title, slug, summary, content, image, author, categories]
  );
  res.json(result.rows);
});

module.exports = router;

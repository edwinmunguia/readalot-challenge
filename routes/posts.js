const router = require("express").Router();
const pool = require("../database");
const generateError = require("../utils");

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
  const id = req.params.id;
  const result = await pool.query(`SELECT * FROM posts WHERE id=${id} LIMIT 1`);
  if (result.rowCount > 0) res.json(result.rows);
  else res.json(generateError("This post doesn't exist."));
});

module.exports = router;

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
  else res.json(utils.generateError("This post doesn't exist."));
});

module.exports = router;

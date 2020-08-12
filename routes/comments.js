const router = require("express").Router();
const pool = require("../database");
const utils = require("../utils");
const { validateCommentData } = require("../datavalidation");

/**
 * Retrieve post's comments list
 */
router.get("/post/:id", async (req, res) => {
  const id = Number(req.params.id);

  //Verify if the current post exist
  const postExist = await pool.query(
    "SELECT id FROM posts WHERE id=$1 LIMIT 1",
    [id]
  );

  //Error. The post doesn't exist
  if (result.rowCount < 1)
    res.status(404).json(utils.generateError("The post doesn't exist."));

  //Otherwise, let's send comments list
  const { rows } = await pool.query("SELECT * FROM comments WHERE post=$1", [
    id,
  ]);
  res.json(rows);
});

/**
 * Add comment to post
 */
router.get("/", async (req, res) => {
  const { post, comment } = req.body;

  //Let's validate the comment data
  const { error } = validateCommentData({ post, comment });

  //Let's check if there is an error
  if (error)
    res.status(400).json(utils.generateError(error.details[0].message));

  //Let's verify the current post exist
  const postExist = await pool.query(
    "SELECT id FROM posts WHERE id=$1 LIMIT 1",
    [id]
  );

  //Error. The post doesn't exist
  if (result.rowCount < 1)
    res.status(404).json(utils.generateError("The post doesn't exist."));

  //Otherwise, let's send comments list
  const {
    rows,
  } = await pool.query(
    "INSERT INTO comments (post, author, comment, publishedOn) VALUES($1, $2, $3, NOW())",
    [postId, 1, comment]
  );

  res.json(rows);
});

module.exports = router;

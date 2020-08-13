const router = require("express").Router();
const pool = require("../database");
const utils = require("../utils");
const { validateCommentData } = require("../datavalidation");
const verifyToken = require("../middlewares/verifytoken");

/**
 * Retrieve post's comments list
 */
router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id < 0) return res.json(utils.generateError("Invalid post ID."));

    //Verify if the current post exist
    const postExist = await pool.query(
      "SELECT id FROM posts WHERE id=$1 LIMIT 1",
      [id]
    );

    //Error. The post doesn't exist
    if (postExist.rows.length < 1)
      return res
        .status(404)
        .json(utils.generateError("The post doesn't exist."));

    //Otherwise, let's send comments list
    const result = await pool.query(
      "SELECT c.id, c.comment, c.published_on, u.id as author_id, " +
        "u.username as author_username FROM comments c " +
        "LEFT JOIN users u ON c.author = u.id ORDER BY c.id DESC WHERE c.post=$1",
      [id]
    );
    return res.json(result.rows);
  } catch (err) {
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

/**
 * Add comment to post
 */
router.post("/post/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const author = req.user;

    if (id < 0) return res.json(utils.generateError("Invalid post ID."));

    //Let's validate the comment data
    const { error } = validateCommentData({ comment });

    //Let's check if there is an error
    if (error)
      return res
        .status(400)
        .json(utils.generateError(error.details[0].message));

    //Let's verify the current post exist
    const postExist = await pool.query(
      "SELECT id FROM posts WHERE id=$1 LIMIT 1",
      [id]
    );

    //Error. The post doesn't exist
    if (postExist.rows.length < 1)
      return res
        .status(404)
        .json(utils.generateError("The post doesn't exist."));

    //Otherwise, let's save the comment
    const result = await pool.query(
      "INSERT INTO comments (post, author, comment, published_on) VALUES($1, $2, $3, NOW())",
      [id, author.id, comment]
    );

    return res.json(result.rows);
  } catch (err) {
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

module.exports = router;
